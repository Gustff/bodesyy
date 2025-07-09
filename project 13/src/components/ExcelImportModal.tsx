import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Download, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
  title: string;
  templateData: any[];
  expectedColumns: string[];
}

const ExcelImportModal: React.FC<ExcelImportModalProps> = ({ 
  isOpen, 
  onClose, 
  onImport, 
  title, 
  templateData, 
  expectedColumns 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [importData, setImportData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');
    
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validar columnas
        if (jsonData.length > 0) {
          const fileColumns = Object.keys(jsonData[0] as object);
          const missingColumns = expectedColumns.filter(col => !fileColumns.includes(col));
          
          if (missingColumns.length > 0) {
            setError(`Faltan las siguientes columnas: ${missingColumns.join(', ')}`);
            return;
          }
        }

        setImportData(jsonData);
      } catch (err) {
        setError('Error al leer el archivo Excel. Verifica que el formato sea correcto.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, `plantilla_${title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
  };

  const handleImport = () => {
    if (importData.length > 0) {
      onImport(importData);
      setImportData([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
            Importar {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Download Template */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-2">Paso 1: Descargar Plantilla</h3>
          <p className="text-blue-700 text-sm mb-3">
            Descarga la plantilla Excel con el formato correcto para importar tus datos.
          </p>
          <button
            onClick={downloadTemplate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar Plantilla
          </button>
        </div>

        {/* Upload Area */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Paso 2: Subir Archivo Excel</h3>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Arrastra tu archivo Excel aquí o{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                selecciona un archivo
              </button>
            </p>
            <p className="text-sm text-gray-500">Formatos soportados: .xlsx, .xls</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Error en el archivo</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Preview Data */}
        {importData.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Vista Previa ({importData.length} registros)
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 max-h-60 overflow-auto">
              <div className="text-sm">
                <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 mb-2">
                  {expectedColumns.slice(0, 3).map(col => (
                    <div key={col}>{col}</div>
                  ))}
                </div>
                {importData.slice(0, 5).map((row, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-1 text-gray-600">
                    {expectedColumns.slice(0, 3).map(col => (
                      <div key={col} className="truncate">
                        {(row as any)[col]?.toString() || '-'}
                      </div>
                    ))}
                  </div>
                ))}
                {importData.length > 5 && (
                  <div className="text-center text-gray-500 mt-2">
                    ... y {importData.length - 5} registros más
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expected Columns */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-800 mb-2">Columnas requeridas:</h4>
          <div className="flex flex-wrap gap-2">
            {expectedColumns.map(col => (
              <span key={col} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">
                {col}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleImport}
            disabled={importData.length === 0}
            className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            Importar {importData.length} registros
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelImportModal;