// src/pages/MyProfile.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    dob: '',
  });
  const [social, setSocial] = useState({
    facebook: '',
    github: '',
    linkedin: '',
    medium: '',
    youtube: '',
    twitter: '',
    instagram: '',
    personalWebsite: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!token) {
      navigate('/login');
      return;
    }
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setUser(userObj);
      setDetails(userObj.details || {});
      setSocial(userObj.social || {});
    }
  }, [navigate]);

  const handleDetailsChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSocialChange = e => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setLoading(true);

    // Map frontend state to backend schema keys
    const payload = {
      id: user.id,
      first_name: details.firstName,
      last_name: details.lastName,
      phone_number: details.phoneNumber,
      address: details.address,
      dob: details.dob,
      facebook: social.facebook,
      github: social.github,
      linkedin: social.linkedin,
      medium: social.medium,
      youtube: social.youtube,
      twitter: social.twitter,
      instagram: social.instagram,
      personal_website: social.personalWebsite,
    };

    fetch(`${API}/update_user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setDetails(data.user.details || {});
        setSocial(data.user.social || {});
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoading(false);
        setIsEditing(false);
        alert('Profile updated!');
      })
      .catch(() => setLoading(false));
    };


  if (loading) return <div>Loading...</div>;

  return (
    <div style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: 24,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24, letterSpacing: 1 }}>My Profile</h1>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            marginBottom: 24,
            float: 'right',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,123,255,0.08)'
          }}
        >
          Edit Profile
        </button>
      )}
      <form onSubmit={handleSubmit} style={{ clear: 'both' }}>
        <Section title="Basic Details">
          {isEditing ? (
            <>
              <ProfileInput label="First Name" name="firstName" value={details.firstName} onChange={handleDetailsChange} />
              <ProfileInput label="Last Name" name="lastName" value={details.lastName} onChange={handleDetailsChange} />
              <ProfileInput label="Phone Number" name="phoneNumber" value={details.phoneNumber} onChange={handleDetailsChange} />
              <ProfileInput label="Email" name="email" value={details.email} onChange={handleDetailsChange} />
              <ProfileInput label="Address" name="address" value={details.address} onChange={handleDetailsChange} />
              <ProfileInput label="Date of Birth" name="dob" type="date" value={details.dob} onChange={handleDetailsChange} />
            </>
          ) : (
            <div>
              <ProfileField label="First Name" value={details.firstName} />
              <ProfileField label="Last Name" value={details.lastName} />
              <ProfileField label="Phone Number" value={details.phoneNumber} />
              <ProfileField label="Email" value={details.email} />
              <ProfileField label="Address" value={details.address} />
              <ProfileField label="Date of Birth" value={details.dob} />
            </div>
          )}
        </Section>

        <Section title="Social Links">
          {isEditing ? (
            <>
              <ProfileInput label="Facebook" name="facebook" value={social.facebook} onChange={handleSocialChange} />
              <ProfileInput label="GitHub" name="github" value={social.github} onChange={handleSocialChange} />
              <ProfileInput label="LinkedIn" name="linkedin" value={social.linkedin} onChange={handleSocialChange} />
              <ProfileInput label="Medium" name="medium" value={social.medium} onChange={handleSocialChange} />
              <ProfileInput label="YouTube" name="youtube" value={social.youtube} onChange={handleSocialChange} />
              <ProfileInput label="Twitter" name="twitter" value={social.twitter} onChange={handleSocialChange} />
              <ProfileInput label="Instagram" name="instagram" value={social.instagram} onChange={handleSocialChange} />
              <ProfileInput label="Personal Website" name="personalWebsite" value={social.personalWebsite} onChange={handleSocialChange} />
            </>
          ) : (
            <div>
              <ProfileField label="Facebook" value={social.facebook} isLink />
              <ProfileField label="GitHub" value={social.github} isLink />
              <ProfileField label="LinkedIn" value={social.linkedin} isLink />
              <ProfileField label="Medium" value={social.medium} isLink />
              <ProfileField label="YouTube" value={social.youtube} isLink />
              <ProfileField label="Twitter" value={social.twitter} isLink />
              <ProfileField label="Instagram" value={social.instagram} isLink />
              <ProfileField label="Personal Website" value={social.personalWebsite} isLink />
            </div>
          )}
        </Section>

        {isEditing && (
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              type="button"
              onClick={() => {
                // Reset details and social to original user values and exit edit mode
                setDetails(user.details || {});
                setSocial(user.social || {});
                setIsEditing(false);
              }}
              style={{
                flex: 1,
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(220,53,69,0.08)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                background: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(40,167,69,0.08)'
              }}
            >
              Save Changes
            </button>
            
          </div>
        )}
      </form>
    </div>
  );
}

// Helper components

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{
        fontSize: 20,
        color: '#222',
        marginBottom: 12,
        borderBottom: '1px solid #eee',
        paddingBottom: 6,
        letterSpacing: 0.5
      }}>{title}</h2>
      {children}
    </section>
  );
}

function ProfileInput({ label, name, value, onChange, type = 'text' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: 6,
          backgroundColor: '#fff',
          fontSize: 15,
        }}
      />
    </div>
  );
}

function ProfileField({ label, value, isLink }) {
  let displayValue = value || '-'; // Show '-' if value is empty
  let link = value;
  if (isLink && value && !/^https?:\/\//.test(value)) {
    link = 'https://' + value;
  }
  return (
    <div style={{
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
      borderBottom: '1px solid #f1f1f1'
    }}>
      <span style={{
        minWidth: 140,
        color: '#666',
        fontWeight: 500,
        fontSize: 15,
        letterSpacing: 0.2
      }}>{label}:</span>
      {isLink && value ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#007bff',
            textDecoration: 'underline',
            fontSize: 15,
            wordBreak: 'break-all'
          }}
        >
          {displayValue}
        </a>
      ) : (
        <span style={{ color: '#222', fontSize: 15 }}>{displayValue}</span>
      )}
    </div>
  );
}

