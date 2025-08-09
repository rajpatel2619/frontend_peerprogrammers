import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiSave, FiX, FiExternalLink, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiGlobe } from 'react-icons/fi';

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
      })
      .catch(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {details.firstName || 'Your'} {details.lastName || 'Profile'}
              </h1>
              <p className="text-blue-100">{details.email || 'user@example.com'}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <FiEdit className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setDetails(user.details || {});
                  setSocial(user.social || {});
                  setIsEditing(false);
                }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <FiX className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Personal Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              Personal Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isEditing ? (
                <>
                  <ProfileInput 
                    label="First Name" 
                    name="firstName" 
                    value={details.firstName} 
                    onChange={handleDetailsChange}
                    icon={<FiUser />}
                  />
                  <ProfileInput 
                    label="Last Name" 
                    name="lastName" 
                    value={details.lastName} 
                    onChange={handleDetailsChange}
                    icon={<FiUser />}
                  />
                  <ProfileInput 
                    label="Phone Number" 
                    name="phoneNumber" 
                    value={details.phoneNumber} 
                    onChange={handleDetailsChange}
                    icon={<FiPhone />}
                    type="tel"
                  />
                  <ProfileInput 
                    label="Email" 
                    name="email" 
                    value={details.email} 
                    onChange={handleDetailsChange}
                    icon={<FiMail />}
                    type="email"
                  />
                  <ProfileInput 
                    label="Address" 
                    name="address" 
                    value={details.address} 
                    onChange={handleDetailsChange}
                    icon={<FiMapPin />}
                  />
                  <ProfileInput 
                    label="Date of Birth" 
                    name="dob" 
                    value={details.dob} 
                    onChange={handleDetailsChange}
                    icon={<FiCalendar />}
                    type="date"
                  />
                </>
              ) : (
                <>
                  <ProfileField 
                    label="First Name" 
                    value={details.firstName} 
                    icon={<FiUser className="text-blue-500" />}
                  />
                  <ProfileField 
                    label="Last Name" 
                    value={details.lastName} 
                    icon={<FiUser className="text-blue-500" />}
                  />
                  <ProfileField 
                    label="Phone Number" 
                    value={details.phoneNumber} 
                    icon={<FiPhone className="text-blue-500" />}
                  />
                  <ProfileField 
                    label="Email" 
                    value={details.email} 
                    icon={<FiMail className="text-blue-500" />}
                    isEmail
                  />
                  <ProfileField 
                    label="Address" 
                    value={details.address} 
                    icon={<FiMapPin className="text-blue-500" />}
                  />
                  <ProfileField 
                    label="Date of Birth" 
                    value={details.dob} 
                    icon={<FiCalendar className="text-blue-500" />}
                  />
                </>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <FiGlobe className="w-5 h-5" />
              Social Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isEditing ? (
                <>
                  <ProfileInput 
                    label="GitHub" 
                    name="github" 
                    value={social.github} 
                    onChange={handleSocialChange}
                    icon={<FiGithub />}
                    placeholder="username"
                  />
                  <ProfileInput 
                    label="LinkedIn" 
                    name="linkedin" 
                    value={social.linkedin} 
                    onChange={handleSocialChange}
                    icon={<FiLinkedin />}
                    placeholder="linkedin.com/in/username"
                  />
                  <ProfileInput 
                    label="Twitter" 
                    name="twitter" 
                    value={social.twitter} 
                    onChange={handleSocialChange}
                    icon={<FiTwitter />}
                    placeholder="twitter.com/username"
                  />
                  <ProfileInput 
                    label="Instagram" 
                    name="instagram" 
                    value={social.instagram} 
                    onChange={handleSocialChange}
                    icon={<FiInstagram />}
                    placeholder="instagram.com/username"
                  />
                  <ProfileInput 
                    label="YouTube" 
                    name="youtube" 
                    value={social.youtube} 
                    onChange={handleSocialChange}
                    icon={<FiYoutube />}
                    placeholder="youtube.com/username"
                  />
                  <ProfileInput 
                    label="Personal Website" 
                    name="personalWebsite" 
                    value={social.personalWebsite} 
                    onChange={handleSocialChange}
                    icon={<FiGlobe />}
                    placeholder="example.com"
                  />
                </>
              ) : (
                <>
                  <ProfileField 
                    label="GitHub" 
                    value={social.github} 
                    icon={<FiGithub className="text-gray-700 dark:text-gray-300" />}
                    isLink
                    linkPrefix="https://github.com/"
                  />
                  <ProfileField 
                    label="LinkedIn" 
                    value={social.linkedin} 
                    icon={<FiLinkedin className="text-blue-700 dark:text-blue-400" />}
                    isLink
                    linkPrefix="https://linkedin.com/in/"
                  />
                  <ProfileField 
                    label="Twitter" 
                    value={social.twitter} 
                    icon={<FiTwitter className="text-blue-400" />}
                    isLink
                    linkPrefix="https://twitter.com/"
                  />
                  <ProfileField 
                    label="Instagram" 
                    value={social.instagram} 
                    icon={<FiInstagram className="text-pink-600" />}
                    isLink
                    linkPrefix="https://instagram.com/"
                  />
                  <ProfileField 
                    label="YouTube" 
                    value={social.youtube} 
                    icon={<FiYoutube className="text-red-600" />}
                    isLink
                    linkPrefix="https://youtube.com/"
                  />
                  <ProfileField 
                    label="Personal Website" 
                    value={social.personalWebsite} 
                    icon={<FiGlobe className="text-indigo-500" />}
                    isLink
                  />
                </>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                <FiSave className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Helper Components
function ProfileInput({ label, name, value, onChange, type = 'text', icon, placeholder }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2 border ${value ? 'border-gray-300' : 'border-gray-200'} dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white`}
        />
      </div>
    </div>
  );
}

function ProfileField({ label, value, icon, isLink = false, isEmail = false, linkPrefix = '' }) {
  let displayValue = value || 'Not provided';
  
  if (isLink && value) {
    let link = value;
    if (linkPrefix && !value.startsWith('http')) {
      link = linkPrefix + value;
    } else if (!value.startsWith('http')) {
      link = 'https://' + value;
    }
    
    return (
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {displayValue} <FiExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  if (isEmail && value) {
    return (
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <a
            href={`mailto:${value}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {displayValue}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`${value ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
          {displayValue}
        </p>
      </div>
    </div>
  );
}