import html2pdf from 'html2pdf.js';

export const downloadResumePDF = () => {
  const element = document.getElementById('resume-content');
  
  if (!element) {
    console.error('Resume content not found');
    return;
  }

  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { 
      orientation: 'portrait', 
      unit: 'mm', 
      format: 'a4',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  } as any;

  html2pdf().set(opt).from(element).save();
};
