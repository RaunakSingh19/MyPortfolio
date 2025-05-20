// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function AdminPage() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     techStack: '',
//     githubUrl: '',
//     liveDemo: ''
//   });
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
    
//     if (!selectedFile) {
//       setFile(null);
//       setPreview(null);
//       return;
//     }

//     // Validate file size
//     if (selectedFile.size > 15 * 1024 * 1024) {
//       setError('File size must be less than 15MB');
//       return;
//     }

//     setFile(selectedFile);
//     setError('');

//     // Create preview
//     if (selectedFile.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else if (selectedFile.type.startsWith('video/')) {
//       setPreview('video');
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);
//     setUploadProgress(0);

//     try {
//       if (!file) {
//         throw new Error('Please select a file to upload');
//       }

//       const formPayload = new FormData();
//       formPayload.append('title', formData.title);
//       formPayload.append('description', formData.description);
//       formPayload.append('techStack', formData.techStack);
//       formPayload.append('githubUrl', formData.githubUrl);
//       formPayload.append('liveDemo', formData.liveDemo);
//       formPayload.append('media', file);

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects`,
//         formPayload,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           }
//         }
//       );

//       navigate('/', { 
//         state: { 
//           success: 'Project uploaded successfully!' 
//         } 
//       });
//     } catch (err) {
//       console.error('Upload error:', err);
      
//       let errorMessage = 'Upload failed. Please try again.';
//       if (err.response) {
//         errorMessage = err.response.data.error || 
//                       err.response.data.message || 
//                       errorMessage;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//       setUploadProgress(0);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <h2 className="text-3xl font-bold mb-8 text-center">Add New Project</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Project Title *
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//             minLength="3"
//             maxLength="100"
//           />
//         </div>

//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description *
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="5"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//             minLength="10"
//             maxLength="1000"
//           />
//         </div>

//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Tech Stack (comma separated) *
//           </label>
//           <input
//             type="text"
//             name="techStack"
//             value={formData.techStack}
//             onChange={handleChange}
//             placeholder="React, Node.js, MongoDB"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             GitHub URL *
//           </label>
//           <input
//             type="url"
//             name="githubUrl"
//             value={formData.githubUrl}
//             onChange={handleChange}
//             placeholder="https://github.com/username/repo"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//             pattern="https?://.+"
//           />
//         </div>

//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Live Demo URL (optional)
//           </label>
//           <input
//             type="url"
//             name="liveDemo"
//             value={formData.liveDemo}
//             onChange={handleChange}
//             placeholder="https://your-project-demo.com"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             pattern="https?://.+"
//           />
//         </div>

//         <div className="form-group">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Media File (image or video, max 15MB) *
//           </label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*,video/*"
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//             required
//           />
//           {preview && (
//             <div className="mt-4">
//               {preview === 'video' ? (
//                 <div className="bg-gray-100 p-4 rounded-md border">
//                   <p className="text-gray-700">Video selected: {file.name}</p>
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <img 
//                     src={preview} 
//                     alt="Preview" 
//                     className="max-h-64 w-auto rounded-md border shadow-sm"
//                   />
//                   <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
//                     {file.name}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {uploadProgress > 0 && uploadProgress < 100 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div 
//               className="bg-blue-600 h-2.5 rounded-full" 
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//             <div className="text-right text-xs text-gray-500 mt-1">
//               {uploadProgress}% uploaded
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-6 py-2 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Uploading...
//               </span>
//             ) : 'Upload Project'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the separate CSS file

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
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/projects`,
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
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
        errorMessage = err.response.data.error || 
                      err.response.data.message || 
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

          <div className="form-group">
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
