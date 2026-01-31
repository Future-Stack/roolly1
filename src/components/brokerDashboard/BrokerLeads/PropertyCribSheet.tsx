import React, { useRef } from 'react';
import { X, FileText, Eye, ExternalLink } from 'lucide-react';
import jsPDF from 'jspdf';

interface Property {
  id: string;
  name: string;
  type: string;
  transaction: string;
  location: string;
  size: string;
  price: string;
}

interface PropertyCribSheetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PropertyCribSheet: React.FC<PropertyCribSheetProps> = ({ 
  isOpen = true, 
  onClose 
}) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  
  const properties: Property[] = [
    {
      id: '1',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Industrial',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '2',
      name: 'PR002 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Sell',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '3',
      name: 'PR003 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '4',
      name: 'PR004 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '5',
      name: 'PR005 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    }
  ];

  const handleExportPDFSimple = () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Property Crib Sheet', pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(11);
      pdf.text('Quick reference guide for all available properties', pageWidth / 2, 30, { align: 'center' });
      
      // Add date
      const date = new Date().toLocaleDateString('en-GB');
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${date}`, pageWidth / 2, 37, { align: 'center' });
      
      // Start table
      const startY = 50;
      let currentY = startY;
      
      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, currentY, pageWidth - 20, 10, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'bold');
      
      const headers = ['Property Name', 'Type', 'Transaction', 'Location', 'Size', 'Price'];
      const colWidths = [40, 20, 25, 45, 20, 30];
      
      let x = 10;
      headers.forEach((header, i) => {
        pdf.text(header, x + 2, currentY + 7);
        x += colWidths[i];
      });
      
      currentY += 12;
      
      // Table rows
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      properties.forEach((property, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(10, currentY, pageWidth - 20, 10, 'F');
        }
        
        x = 10;
        pdf.text(property.name, x + 2, currentY + 7);
        x += colWidths[0];
        
        pdf.text(property.type, x + 2, currentY + 7);
        x += colWidths[1];
        
        pdf.text(property.transaction, x + 2, currentY + 7);
        x += colWidths[2];
        
        pdf.text(property.location, x + 2, currentY + 7);
        x += colWidths[3];
        
        pdf.text(property.size, x + 2, currentY + 7);
        x += colWidths[4];
        
        pdf.text(property.price, x + 2, currentY + 7);
        
        currentY += 10;
        
        // Add new page if needed
        if (currentY > 280) {
          pdf.addPage();
          currentY = 20;
        }
      });
      
      // Add summary
      currentY += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Total Properties: ${properties.length}`, 10, currentY);
      
      // Download PDF
      const fileName = `Property_Crib_Sheet_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-[1000px] w-full max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-gray-200">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 mt-1" strokeWidth={2} />
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 mb-1">
                Property Crib Sheet
              </h2>
              <p className="text-[13px] text-gray-600">
                Quick reference guide for all available properties with pricing details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" ref={pdfRef}>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-semibold text-gray-900">
                Available Properties
              </h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[12px] font-semibold rounded-lg">
                {properties.length} Units
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportPDFSimple}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[14px] font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
                Export as PDF
              </button>
              {/* Alternative button for more advanced PDF */}
              {/* <button
                onClick={handleExportPDFAdvanced}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[14px] font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={2} />
                Export PDF (Advanced)
              </button> */}
            </div>
          </div>

          <p className="text-[13px] text-gray-600 mb-6">
            Properties ready for immediate Sell and lease
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Property Name
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Transaction
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Size
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Rent/Price
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr
                    key={property.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index === properties.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.name}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.type}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.transaction}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.location}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.size}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.price}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCribSheet;