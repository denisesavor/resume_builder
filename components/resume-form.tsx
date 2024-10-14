"use client"

import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ResumeData } from '@/lib/types';

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ResumeForm({ data, setData }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personalInfo');

  const updatePersonalInfo = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', graduationDate: '' }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '' }]
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setActiveSection('personalInfo')} variant={activeSection === 'personalInfo' ? 'default' : 'outline'}>Personal Info</Button>
        <Button onClick={() => setActiveSection('workExperience')} variant={activeSection === 'workExperience' ? 'default' : 'outline'}>Work Experience</Button>
        <Button onClick={() => setActiveSection('education')} variant={activeSection === 'education' ? 'default' : 'outline'}>Education</Button>
        <Button onClick={() => setActiveSection('skills')} variant={activeSection === 'skills' ? 'default' : 'outline'}>Skills</Button>
        <Button onClick={() => setActiveSection('projects')} variant={activeSection === 'projects' ? 'default' : 'outline'}>Projects</Button>
      </div>

      {activeSection === 'personalInfo' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={data.personalInfo.name} onChange={(e) => updatePersonalInfo('name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
          </div>
        </div>
      )}

      {activeSection === 'workExperience' && (
        <div className="space-y-4">
          {data.workExperience.map((exp, index) => (
            <div key={index} className="border p-4 rounded-md">
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="mb-2" />
              <Input placeholder="Position" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} className="mb-2" />
              <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="mb-2" />
              <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="mb-2" />
              <Textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} />
            </div>
          ))}
          <Button onClick={addExperience}>Add Experience</Button>
        </div>
      )}

      {activeSection === 'education' && (
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded-md">
              <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="mb-2" />
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="mb-2" />
              <Input placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)} />
            </div>
          ))}
          <Button onClick={addEducation}>Add Education</Button>
        </div>
      )}

      {activeSection === 'skills' && (
        <div className="space-y-4">
          {data.skills.map((skill, index) => (
            <Input key={index} placeholder="Skill" value={skill} onChange={(e) => updateSkill(index, e.target.value)} />
          ))}
          <Button onClick={addSkill}>Add Skill</Button>
        </div>
      )}

      {activeSection === 'projects' && (
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="border p-4 rounded-md">
              <Input placeholder="Project Name" value={project.name} onChange={(e) => updateProject(index, 'name', e.target.value)} className="mb-2" />
              <Textarea placeholder="Project Description" value={project.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
            </div>
          ))}
          <Button onClick={addProject}>Add Project</Button>
        </div>
      )}
    </div>
  );
}