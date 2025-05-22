import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Admin.css';

// CHANGE THIS to your backend API URL or Cloudinary direct upload endpoint as needed
const API_BASE_URL = 'http://localhost:5000/api'; // <-- Update as needed

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB');
      return;
    }

    setFile(selectedFile);
    setError('');

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type.startsWith('video/')) {
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
      if (!file) {
        throw new Error('Please select a file to upload');
      }

      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('techStack', formData.techStack);
      formPayload.append('githubUrl', formData.githubUrl);
      formPayload.append('liveDemo', formData.liveDemo);
      formPayload.append('media', file);

      const response = await axios.post(
        `${API_BASE_URL}/projects`,
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          }
        }
      );

      navigate('/', {
        state: {
          success: 'Project uploaded successfully!'
        }
      });
    } catch (err) {
      console.error('Upload error:', err);

      let errorMessage = 'Upload failed. Please try again.';
      if (err.response) {
        errorMessage = err.response.data?.error ||
          err.response.data?.message ||
          errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">Add New Project</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              minLength="3"
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
              minLength="10"
              maxLength="1000"
            />
          </div>

          <div className="form-group">
            <label>
              Tech Stack (comma separated) *
            </label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>

          <div className="form-group">
            <label>
              GitHub URL *
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              required
              pattern="https?://.+"
            />
          </div>

          <div className="form-group">
            <label>
              Live Demo URL (optional)
            </label>
            <input
              type="url"
              name="liveDemo"
              value={formData.liveDemo}
              onChange={handleChange}
              placeholder="https://your-project-demo.com"
              pattern="https?://.+"
            />
          </div>

          {/* <div className="form-group">
            <label>
              Media File (image or video, max 15MB) *
            </label>
            <div className="file-upload">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*"
                required
              />
              <span className="file-custom"></span>
            </div>
            {preview && (
              <div className="preview-container">
                {preview === 'video' ? (
                  <div className="video-preview">
                    <p>Video selected: {file.name}</p>
                  </div>
                ) : (
                  <div className="image-preview">
                    <img
                      src={preview}
                      alt="Preview"
                    />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
            )}
          </div> */}
          <div className="form-group">
            <label>
              Media File (image or video, max 15MB) *
            </label>
            <div className="file-upload-wrapper">
              <label className="file-upload-label">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  required
                  className="file-upload-input"
                />
                <div className="file-upload-content">
                  {preview ? (
                    preview === 'video' ? (
                      <div className="video-preview">
                        <p>Video selected: {file.name}</p>
                      </div>
                    ) : (
                      <div className="image-preview">
                        <img src={preview} alt="Preview" />
                        <span>{file.name}</span>
                      </div>
                    )
                  ) : (
                    <>
                      <svg className="upload-icon" viewBox="0 0 24 24">
                        <path d="M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h7a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1zM5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17 4.3 4.3zm13-1a1 1 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21zm0-14.1a1.1 1.1 0 1 0-1.1 1.1 1.1 1.1 0 0 0 1.1-1.1z"/>
                      </svg>
                      <p className="upload-text">Click to upload image or video</p>
                      <p className="upload-hint">Max file size: 15MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
          

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="upload-progress">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <div className="progress-text">
                {uploadProgress}% uploaded
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? 'submitting' : ''}
            >
              {isSubmitting ? (
                <span className="spinner">
                  <span className="spinner-inner"></span>
                  Uploading...
                </span>
              ) : 'Upload Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}