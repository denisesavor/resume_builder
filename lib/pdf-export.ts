import { ResumeData } from './types';

export const exportToPDF = async (data: ResumeData, template: string) => {
  // For now, we'll just log the data as the actual PDF export requires client-side libraries
  console.log('Exporting to PDF:', { data, template });
  alert('PDF export functionality is not implemented in this demo. Check the console for the data that would be exported.');
};