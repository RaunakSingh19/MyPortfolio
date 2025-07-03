import React, { useState } from 'react';
import api from '../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Admin.css';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveDemo: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > 15 * 1024 * 1024) {
      setError('File size must be under 15MB');
      return;
    }

    setFile(selected);
    setError('');

    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    } else if (selected.type.startsWith('video/')) {
      setPreview('video');
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      if (!file) throw new Error('Please select a file to upload');

      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('techStack', formData.techStack);
      formPayload.append('githubUrl', formData.githubUrl);
      formPayload.append('liveDemo', formData.liveDemo);
      formPayload.append('media', file); // ✅ Field name matches backend

      await api.post('/projects', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          }
        }
      });

      navigate('/', { state: { success: 'Project uploaded successfully!' } });
    } catch (err) {
      console.error('Upload error:', err);
      let message = 'Upload failed. Please try again.';
      if (err.response) {
        message = err.response.data?.error || err.response.data?.message || message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">Add New Project</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          {/* Text Inputs */}
          {['title', 'techStack', 'githubUrl', 'liveDemo'].map((field, i) => (
            <div className="form-group" key={i}>
              <label>{field === 'liveDemo' ? 'Live Demo URL (optional)' : field.charAt(0).toUpperCase() + field.slice(1) + ' *'}</label>
              <input
                type={field.includes('Url') ? 'url' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== 'liveDemo'}
                placeholder={field.includes('Url') ? `https://your-${field}.com` : ''}
              />
            </div>
          ))}

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label>Media File (image/video, max 15MB) *</label>
            <div className="file-upload-wrapper">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  required
                  className="file-upload-input"
                />
                <div className="file-upload-content">
                  {preview ? (
                    preview === 'video' ? (
                      <div className="video-preview"><p>Video selected: {file.name}</p></div>
                    ) : (
                      <div className="image-preview">
                        <img src={preview} alt="Preview" />
                        <span>{file.name}</span>
                      </div>
                    )
                  ) : (
                    <>
                      <p className="upload-text">Click to upload image or video</p>
                      <p className="upload-hint">Max file size: 15MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="upload-progress">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              <div className="progress-text">{uploadProgress}% uploaded</div>
            </div>
          )}

          {/* Submit */}
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Upload Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
