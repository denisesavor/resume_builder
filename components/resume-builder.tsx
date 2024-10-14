"use client"

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    education: [{ institution: '', degree: '', graduationYear: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    skills: [''],
  });
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Resume saved",
      description: "Your resume data has been saved successfully.",
    });
  };

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setResumeData(prevData => {
      if (index !== undefined && Array.isArray(prevData[section as keyof typeof prevData])) {
        const newArray = [...prevData[section as keyof typeof prevData] as any[]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prevData, [section]: newArray };
      } else if (typeof prevData[section as keyof typeof prevData] === 'object' && !Array.isArray(prevData[section as keyof typeof prevData])) {
        return { ...prevData, [section]: { ...prevData[section as keyof typeof prevData], [field]: value } };
      } else {
        return { ...prevData, [section]: value };
      }
    });
  };

  const addListItem = (section: 'education' | 'experience' | 'skills') => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], section === 'skills' ? '' : {}],
    }));
  };

  const removeListItem = (section: 'education' | 'experience' | 'skills', index: number) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <Input
          placeholder="Name"
          value={resumeData.personalInfo.name}
          onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Email"
          value={resumeData.personalInfo.email}
          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Phone"
          value={resumeData.personalInfo.phone}
          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Address"
          value={resumeData.personalInfo.address}
          onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
          className="mb-2"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
              className="mb-2"
            />
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
              className="mb-2"
            />
            <Input
              placeholder="Graduation Year"
              value={edu.graduationYear}
              onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value, index)}
              className="mb-2"
            />
            <Button onClick={() => removeListItem('education', index)}>Remove</Button>
          </div>
        ))}
        <Button onClick={() => addListItem('education')}>Add Education</Button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
              className="mb-2"
            />
            <Input
              placeholder="Position"
              value={exp.position}
              onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
              className="mb-2"
            />
            <Input
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
              className="mb-2"
            />
            <Input
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
              className="mb-2"
            />
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
              className="mb-2"
            />
            <Button onClick={() => removeListItem('experience', index)}>Remove</Button>
          </div>
        ))}
        <Button onClick={() => addListItem('experience')}>Add Experience</Button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="mb-2">
            <Input
              placeholder="Skill"
              value={skill}
              onChange={(e) => handleInputChange('skills', index.toString(), e.target.value)}
              className="mb-2"
            />
            <Button onClick={() => removeListItem('skills', index)}>Remove</Button>
          </div>
        ))}
        <Button onClick={() => addListItem('skills')}>Add Skill</Button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Template</h2>
        <Select value={activeTemplate} onValueChange={(value) => setActiveTemplate(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSave}>Save Resume</Button>
    </div>
  );
};

export default ResumeBuilder;
