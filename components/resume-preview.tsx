"use client"

import { ResumeData } from '@/lib/types';
import { Button } from './ui/button';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  setTemplate: (template: string) => void;
}

export function ResumePreview({ data, template, setTemplate }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4 space-x-2">
        <Button onClick={() => setTemplate('modern')} variant={template === 'modern' ? 'default' : 'outline'}>Modern</Button>
        <Button onClick={() => setTemplate('classic')} variant={template === 'classic' ? 'default' : 'outline'}>Classic</Button>
        <Button onClick={() => setTemplate('minimalist')} variant={template === 'minimalist' ? 'default' : 'outline'}>Minimalist</Button>
      </div>
      <div className="bg-white text-black p-8 shadow-lg" id="resume-preview">
        {renderTemplate()}
      </div>
    </div>
  );
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
      </header>
      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Work Experience</h2>
        {data.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
            <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p>{edu.institution}, {edu.graduationDate}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Skills</h2>
        <ul className="list-disc list-inside">
          {data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6 font-serif">
      <header className="text-center border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold">{data.personalInfo.name}</h1>
        <p className="mt-2">{data.personalInfo.email} | {data.personalInfo.phone}</p>
      </header>
      <section>
        <h2 className="text-2xl font-bold uppercase">Work Experience</h2>
        {data.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-bold">{exp.position}</h3>
              <span>{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="italic">{exp.company}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-bold uppercase">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <h3 className="font-bold">{edu.degree}</h3>
              <span>{edu.graduationDate}</span>
            </div>
            <p>{edu.institution}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-bold uppercase">Skills</h2>
        <p>{data.skills.join(', ')}</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold uppercase">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold">{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-4 font-sans">
      <header>
        <h1 className="text-2xl font-light">{data.personalInfo.name}</h1>
        <p className="text-sm text-gray-600">{data.personalInfo.email} | {data.personalInfo.phone}</p>
      </header>
      <section>
        <h2 className="text-lg font-semibold">Experience</h2>
        {data.workExperience.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="font-medium">{exp.position} • {exp.company}</p>
            <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-lg font-semibold">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-1">
            <p>{edu.degree} • {edu.institution} • {edu.graduationDate}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="text-sm">{data.skills.join(' • ')}</p>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-1">
            <p className="font-medium">{project.name}</p>
            <p className="text-sm">{project.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}