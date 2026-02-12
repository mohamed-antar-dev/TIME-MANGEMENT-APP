import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createGeneralNote,
  updateGeneralNote,
  deleteGeneralNote,
  selectGeneralNote,
  toggleGeneralFavorite,
  setSearchQuery,
  setFilterTag,
  setSortBy,
  setViewMode,
  setIsEditing
} from '../../store/notePadSlice';
import { 
  FaPlus, 
  FaSearch, 
  FaStar, 
  FaRegStar, 
  FaTrash, 
  FaEdit, 
  FaSave,
  FaPalette,
  FaTags,
  FaThList,
  FaTh
} from 'react-icons/fa';
import { LuNotepadText } from 'react-icons/lu';
import './NotePad.css';

const NotePad = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const generalNotes = useSelector((state) => state.notePad.generalNotes);
  const currentNote = useSelector((state) => state.notePad.currentGeneralNote);
  const selectedNoteId = useSelector((state) => state.notePad.selectedNoteId);
  const searchQuery = useSelector((state) => state.notePad.searchQuery);
  const filterTag = useSelector((state) => state.notePad.filterTag);
  const sortBy = useSelector((state) => state.notePad.sortBy);
  const viewMode = useSelector((state) => state.notePad.viewMode);
  const isEditing = useSelector((state) => state.notePad.isEditing);
  const autoSaveEnabled = useSelector((state) => state.notePad.autoSaveEnabled);
  const lastSaved = useSelector((state) => state.notePad.lastSaved);
  const colorPalette = useSelector((state) => state.notePad.colorPalette);
  const availableTags = useSelector((state) => state.notePad.availableTags);

  // Local state
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedColor, setEditedColor] = useState('default');
  const [editedTags, setEditedTags] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTagSelector, setShowTagSelector] = useState(false);

  // Update local state when current note changes
  useEffect(() => {
    if (currentNote.id) {
      setEditedTitle(currentNote.title);
      setEditedContent(currentNote.content);
      setEditedColor(currentNote.color);
      setEditedTags(currentNote.tags);
    }
  }, [currentNote]);

  // Auto-save functionality
  useEffect(() => {
    if (!currentNote.id || !autoSaveEnabled || !isEditing) return;

    const timer = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => clearTimeout(timer);
  }, [editedTitle, editedContent, editedColor, editedTags]);

  // Filter and sort notes
  const getFilteredNotes = () => {
    let filtered = [...generalNotes];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tag filter
    if (filterTag !== 'all') {
      filtered = filtered.filter(note => note.tags.includes(filterTag));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'createdAt') {
        return b.createdAt - a.createdAt;
      } else if (sortBy === 'favorite') {
        return b.favorite - a.favorite;
      } else {
        return b.updatedAt - a.updatedAt;
      }
    });

    return filtered;
  };

  // Handlers
  const handleCreateNote = () => {
    dispatch(createGeneralNote());
  };

  const handleSelectNote = (noteId) => {
    dispatch(selectGeneralNote(noteId));
    dispatch(setIsEditing(false));
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteGeneralNote(noteId));
    }
  };

  const handleToggleFavorite = (noteId) => {
    dispatch(toggleGeneralFavorite(noteId));
  };

  const handleSave = () => {
    if (currentNote.id) {
      dispatch(updateGeneralNote({
        id: currentNote.id,
        updates: {
          title: editedTitle,
          content: editedContent,
          color: editedColor,
          tags: editedTags
        }
      }));
    }
  };

  const handleEdit = () => {
    dispatch(setIsEditing(true));
  };

  const handleColorSelect = (colorId) => {
    setEditedColor(colorId);
    setShowColorPicker(false);
  };

  const handleTagToggle = (tag) => {
    if (editedTags.includes(tag)) {
      setEditedTags(editedTags.filter(t => t !== tag));
    } else {
      setEditedTags([...editedTags, tag]);
    }
  };

  const getColorValue = (colorId) => {
    const color = colorPalette.find(c => c.id === colorId);
    return color ? color.value : 'var(--bg-elevated)';
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="notepad-container">
      {/* Header */}
      <div className="notepad-header">
        <div className="notepad-title-section">
          <h1 className="notepad-title">NotePad</h1>
          <p className="notepad-subtitle">Capture your ideas, organize your thoughts</p>
        </div>

        {/* Search & Filters */}
        <div className="notepad-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>

          <div className="filter-controls">
            <select 
              value={filterTag} 
              onChange={(e) => dispatch(setFilterTag(e.target.value))}
              className="filter-select"
            >
              <option value="all">All Tags</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="filter-select"
            >
              <option value="updatedAt">Last Modified</option>
              <option value="createdAt">Date Created</option>
              <option value="title">Title</option>
              <option value="favorite">Favorites</option>
            </select>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => dispatch(setViewMode('list'))}
              >
                <FaThList />
              </button>
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => dispatch(setViewMode('grid'))}
              >
                <FaTh />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="notepad-main">
        {/* Sidebar */}
        <div className="notepad-sidebar">
          <div className="sidebar-header">
            <button className="new-note-button" onClick={handleCreateNote}>
              <FaPlus />
              <span>New Note</span>
            </button>
          </div>

          <div className="notes-list">
            {filteredNotes.length === 0 ? (
              <div className="no-notes">
                <LuNotepadText className="no-notes-icon" />
                <p>No notes found</p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div
                  key={note.id}
                  className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
                  style={{ backgroundColor: getColorValue(note.color) }}
                  onClick={() => handleSelectNote(note.id)}
                >
                  <div className="note-item-header">
                    <h4>{note.title}</h4>
                    <div className="note-item-actions">
                      <button
                        className="note-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(note.id);
                        }}
                      >
                        {note.favorite ? <FaStar className="favorite-icon" /> : <FaRegStar />}
                      </button>
                      <button
                        className="note-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="note-preview">
                    {note.content.slice(0, 80)}{note.content.length > 80 ? '...' : ''}
                  </p>
                  {note.tags.length > 0 && (
                    <div className="note-tags">
                      {note.tags.map(tag => (
                        <span key={tag} className="note-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="note-date">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="notepad-editor" style={{ backgroundColor: getColorValue(editedColor) }}>
          {currentNote.id ? (
            <>
              <div className="editor-header">
                {isEditing ? (
                  <input
                    type="text"
                    className="editor-title-input"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Note title..."
                  />
                ) : (
                  <h2 className="editor-title">{currentNote.title}</h2>
                )}

                <div className="editor-actions">
                  <button 
                    className={`editor-action-btn ${showColorPicker ? 'active' : ''}`}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    <FaPalette />
                  </button>
                  <button 
                    className={`editor-action-btn ${showTagSelector ? 'active' : ''}`}
                    onClick={() => setShowTagSelector(!showTagSelector)}
                  >
                    <FaTags />
                  </button>
                  {isEditing ? (
                    <button className="editor-action-btn" onClick={handleSave}>
                      <FaSave />
                    </button>
                  ) : (
                    <button className="editor-action-btn" onClick={handleEdit}>
                      <FaEdit />
                    </button>
                  )}
                  <button 
                    className="editor-action-btn"
                    onClick={() => handleToggleFavorite(currentNote.id)}
                  >
                    {currentNote.favorite ? <FaStar className="favorite-icon" /> : <FaRegStar />}
                  </button>
                </div>
              </div>

              {/* Color Picker */}
              {showColorPicker && (
                <div className="editor-toolbar">
                  <div className="color-picker">
                    {colorPalette.map(color => (
                      <div
                        key={color.id}
                        className={`color-option ${editedColor === color.id ? 'active' : ''}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorSelect(color.id)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Selector */}
              {showTagSelector && (
                <div className="editor-toolbar">
                  <div className="tag-selector">
                    {availableTags.map(tag => (
                      <div
                        key={tag}
                        className={`tag-option ${editedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Editor Content */}
              <div className="editor-content">
                {isEditing ? (
                  <textarea
                    className="editor-textarea"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Start writing..."
                  />
                ) : (
                  <div className="editor-view">
                    {currentNote.content || 'No content yet...'}
                  </div>
                )}
              </div>

              {/* Editor Footer */}
              <div className="editor-footer">
                <div className="editor-stats">
                  <span>{editedContent.split(/\s+/).filter(w => w).length} words</span>
                  <span>{editedContent.length} characters</span>
                </div>
                {autoSaveEnabled && lastSaved && (
                  <div className="auto-save-indicator saved">
                    <FaSave className="save-icon" />
                    <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="editor-empty-state">
              <LuNotepadText className="empty-state-icon" />
              <h3 className="empty-state-title">No Note Selected</h3>
              <p className="empty-state-text">
                Select a note from the sidebar or create a new one to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePad;