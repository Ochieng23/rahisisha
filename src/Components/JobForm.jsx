import React, { useState, useEffect } from 'react';

function JobForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('job_title', jobTitle);
    formData.append('company_name', companyName);
    formData.append('email', email);
    formData.append('avatar', avatar);
    formData.append('location', location);
    formData.append('description', description);
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      setJobTitle('');
      setCompanyName('');
      setEmail('');
      setAvatar('');
      setLocation('');
      setDescription('');
      alert('Job posted successfully!');
    } else {
      alert('Failed to post job.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input type="text" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
      </label>
      <br />
      <label>
        Company Name:
        <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Avatar:
        <input type="file" onChange={(event) => setAvatar(event.target.files[0])} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm