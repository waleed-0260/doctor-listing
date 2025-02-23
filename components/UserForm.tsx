'use client';

import { useState, FormEvent } from 'react';

interface UserFormData {
  name: string;
  specialty: string;
  city: string;
  photo: string;
  description: string;
  officeLocation: string;
  contactInfo: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    specialty:"",
    city:"",
    photo:"",
    description:"",
    officeLocation:"",
    contactInfo:""
  });
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'idle';
  }>({
    message: '',
    type: 'idle',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: 'idle' });

    try {
      // Make the POST request to the Mongoose route handler
      const response = await fetch('/api/users/mongoose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Reset the form on success
      setFormData({ name: "",
        specialty:"",
        city:"",
        photo:"",
        description:"",
        officeLocation:"",
        contactInfo:"" });
      setStatus({
        message: 'User added successfully!',
        type: 'success',
      });
    } catch (error) {
      const err = error as Error;
      setStatus({
        message: err.message,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.specialty}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            city
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            photo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.photo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            description
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            officeLocation
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.officeLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            ContactInfo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.contactInfo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium
            ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isSubmitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
      
      {status.message && (
        <div
          className={`mt-4 p-3 rounded ${
            status.type === 'success' ? 'bg-green-100 text-green-800' : 
            status.type === 'error' ? 'bg-red-100 text-red-800' : ''
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}