"use client"


import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ResumeData } from '@/lib/types';
import { Card, CardContent } from './ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export function ResumeForm({ data, setData }: ResumeFormProps) {
  // Remove this line as we'll use Tabs instead
  // const [activeSection, setActiveSection] = useState('personalInfo');

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
    <Card className="p-6 bg-white shadow-lg rounded-lg">
      <Tabs defaultValue="personalInfo" className="w-full">
        <TabsList className="grid w-full grid-cols-5 gap-2">
          <TabsTrigger value="personalInfo" className="hover:bg-gray-100 transition-colors">Personal Info</TabsTrigger>
          <TabsTrigger value="workExperience" className="hover:bg-gray-100 transition-colors">Work Experience</TabsTrigger>
          <TabsTrigger value="education" className="hover:bg-gray-100 transition-colors">Education</TabsTrigger>
          <TabsTrigger value="skills" className="hover:bg-gray-100 transition-colors">Skills</TabsTrigger>
          <TabsTrigger value="projects" className="hover:bg-gray-100 transition-colors">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="personalInfo">
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-semibold">Name</Label>
                <Input id="name" value={data.personalInfo.name} onChange={(e) => updatePersonalInfo('name', e.target.value)} className="border-gray-300 rounded-md" />
              </div>
              <div>
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input id="email" type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} className="border-gray-300 rounded-md" />
              </div>
              <div>
                <Label htmlFor="phone" className="font-semibold">Phone</Label>
                <Input id="phone" type="tel" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} className="border-gray-300 rounded-md" />
              </div>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="workExperience">
          <CardContent>
            <div className="space-y-4">
              {data.workExperience.map((exp, index) => (
                <Card key={index} className="p-4 border border-gray-200 rounded-md">
                  <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Input placeholder="Position" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} className="border-gray-300 rounded-md" />
                </Card>
              ))}
              <Button onClick={addExperience} className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">Add Experience</Button>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="education">
          <CardContent>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <Card key={index} className="p-4 border border-gray-200 rounded-md">
                  <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Input placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)} className="border-gray-300 rounded-md" />
                </Card>
              ))}
              <Button onClick={addEducation} className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">Add Education</Button>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="skills">
          <CardContent>
            <div className="space-y-4">
              {data.skills.map((skill, index) => (
                <Input key={index} placeholder="Skill" value={skill} onChange={(e) => updateSkill(index, e.target.value)} className="border-gray-300 rounded-md" />
              ))}
              <Button onClick={addSkill} className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">Add Skill</Button>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="projects">
          <CardContent>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <Card key={index} className="p-4 border border-gray-200 rounded-md">
                  <Input placeholder="Project Name" value={project.name} onChange={(e) => updateProject(index, 'name', e.target.value)} className="mb-2 border-gray-300 rounded-md" />
                  <Textarea placeholder="Project Description" value={project.description} onChange={(e) => updateProject(index, 'description', e.target.value)} className="border-gray-300 rounded-md" />
                </Card>
              ))}
              <Button onClick={addProject} className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">Add Project</Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
