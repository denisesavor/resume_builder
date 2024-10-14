"use client"

import { useState } from 'react';
import { ResumeForm } from './resume-form';
import { ResumePreview } from './resume-preview';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ResumeData } from '@/lib/types';
import { exportToPDF } from '@/lib/pdf-export';

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '' },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    toast({
      title: "Progress Saved",
      description: "Your resume data has been saved locally.",
    });
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
      toast({
        title: "Data Loaded",
        description: "Your saved resume data has been loaded.",
      });
    }
  };

  const handleExport = () => {
    exportToPDF(resumeData, activeTemplate);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2">
        <ResumeForm data={resumeData} setData={setResumeData} />
        <div className="mt-4 space-x-2">
          <Button onClick={handleSave}>Save Progress</Button>
          <Button onClick={handleLoad} variant="outline">Load Saved Data</Button>
          <Button onClick={handleExport}>Export as PDF</Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ResumePreview data={resumeData} template={activeTemplate} setTemplate={setActiveTemplate} />
      </div>
    </div>
  );
}