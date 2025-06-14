// import React, { useState } from "react";
// import axios from "axios";
// function Home() {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [diffImage, setDiffImage] = useState(null);
//   const [report, setReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!image1 || !image2) {
//       setError("Please upload both images");
//       return;
//     }

//     setLoading(true);
//     setDiffImage(null);
//     setReport("");
//     setError(null);

//     const formData = new FormData();
//     formData.append("image1", image1);
//     formData.append("image2", image2);

//     try {
//       const response = await fetch("http://localhost:3000/api/compare", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       const imagePrefix = "data:image/png;base64,";
//       const diffImageData = data.diffImage.startsWith("data:")
//         ? data.diffImage
//         : imagePrefix + data.diffImage;

//       setDiffImage(diffImageData);
//       setReport(data.summary);
//     } catch (err) {
//       setError("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageReset = () => {
//     setImage1(null);
//     setImage2(null);
//     setDiffImage(null);
//     setReport("");
//     setError(null);
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleExportPdf = async () => {
//     try {
//       const image1Base64 = await fileToBase64(image1);
//       const image2Base64 = await fileToBase64(image2);
//       const diffImageBase64 = diffImage; // هو عندك أصلاً base64 مع البريفكس

//       const response = await axios.post(
//         "http://localhost:3000/api/report", // تأكد من الـ URL صحيح
//         {
//           image1Base64,
//           image2Base64,
//           diffImageBase64,
//           reportText: report,
//         },
//         {
//           responseType: "blob",
//         }
//       );

//       const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(pdfBlob);
//       link.download = "AI_Comparison_Report.pdf";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(link.href);
//     } catch (error) {
//       console.error("Failed to export PDF:", error);
//       alert("فشل في تصدير التقرير. حاول مرة أخرى.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Enhanced Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div
//           className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//         <div
//           className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse"
//           style={{ animationDelay: "4s" }}
//         ></div>

//         {/* Floating particles */}
//         <div
//           className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute top-40 right-32 w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-bounce"
//           style={{ animationDelay: "3s" }}
//         ></div>
//         <div
//           className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-25 animate-bounce"
//           style={{ animationDelay: "5s" }}
//         ></div>
//       </div>

//       <div className="relative z-10 p-6 md:p-12">
//         {/* Hero Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
//             Image Comparison
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
//             Advanced AI-powered visual difference detection with stunning
//             heatmap visualization
//           </p>
//           <div className="mt-8 flex justify-center">
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
//           {/* Enhanced Upload Card */}
//           <div className="group">
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15">
//               <div className="flex items-center justify-center mb-8">
//                 <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white ml-4 tracking-tight">
//                   Upload Images
//                 </h2>
//               </div>

//               <div onSubmit={handleUpload} className="space-y-8">
//                 {[image1, image2].map((image, i) => (
//                   <div key={i} className="group/upload">
//                     <label className="block text-sm font-semibold text-gray-300 mb-3 tracking-wide">
//                       {i === 0 ? "🖼️ First Image" : "🖼️ Second Image"}
//                     </label>
//                     <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-500/50 bg-white/5 group-hover/upload:border-purple-400 group-hover/upload:bg-purple-500/10 rounded-3xl cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg hover:shadow-purple-500/20">
//                       {image ? (
//                         <div className="relative w-full h-full flex items-center justify-center p-4">
//                           <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Preview ${i + 1}`}
//                             className="max-h-48 max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover/upload:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl group-hover/upload:from-transparent transition-all duration-300" />
//                           <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
//                             ✓ Ready
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-center text-gray-400 group-hover/upload:text-purple-300 transition-colors p-8">
//                           <div className="relative">
//                             <svg
//                               className="w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover/upload:scale-110"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="1.5"
//                                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                               />
//                             </svg>
//                             <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-75"></div>
//                           </div>
//                           <p className="font-semibold text-lg mb-2">
//                             Drop your image here
//                           </p>
//                           <p className="text-sm opacity-75 mb-2">
//                             or click to browse
//                           </p>
//                           <div className="inline-flex items-center space-x-2 text-xs bg-white/10 px-3 py-1 rounded-full">
//                             <span>PNG</span>
//                             <span>•</span>
//                             <span>JPG</span>
//                             <span>•</span>
//                             <span>JPEG</span>
//                           </div>
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) =>
//                           i === 0
//                             ? setImage1(e.target.files[0])
//                             : setImage2(e.target.files[0])
//                         }
//                         className="hidden"
//                         required
//                       />
//                     </label>
//                   </div>
//                 ))}

//                 <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     onClick={handleUpload}
//                     className={`group flex-1 relative overflow-hidden py-5 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-xl transform ${
//                       loading
//                         ? "bg-gray-600 cursor-not-allowed shadow-none"
//                         : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95 hover:scale-105"
//                     } flex items-center justify-center`}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//                     {loading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                         Processing Magic...
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-6 h-6 mr-3"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                         Compare Images
//                       </>
//                     )}
//                   </button>

//                   {(image1 || image2) && (
//                     <button
//                       type="button"
//                       onClick={handleImageReset}
//                       className="flex-1 py-5 px-8 rounded-2xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 transform active:scale-95 hover:scale-105 flex items-center justify-center backdrop-blur-sm"
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                         />
//                       </svg>
//                       Reset All
//                     </button>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="mt-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-200 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex items-start">
//                     <div className="flex-shrink-0 mr-4">
//                       <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
//                         <svg
//                           className="w-6 h-6 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-lg mb-1">
//                         Oops! Something went wrong
//                       </h4>
//                       <p>{error}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Heatmap Result */}
//           {diffImage && (
//             <div className="group">
//               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-orange-500/25 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/15">
//                 <div className="flex items-center mb-6">
//                   <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
//                     <svg
//                       className="w-8 h-8 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-3xl font-bold text-white tracking-tight">
//                       Difference Heatmap
//                     </h3>
//                     <p className="text-gray-300 text-sm mt-1">
//                       Visualizing detected changes
//                     </p>
//                   </div>
//                 </div>
//                 <div className="relative group/image">
//                   <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-600 rounded-3xl blur opacity-25 group-hover/image:opacity-40 transition-opacity duration-300"></div>
//                   <img
//                     src={diffImage}
//                     alt="Difference Heatmap"
//                     className="relative rounded-2xl w-full h-auto shadow-2xl border border-white/10 transition-all duration-300 group-hover/image:scale-[1.02]"
//                   />
//                   <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
//                     🔥 Heat Map
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Report Section */}
//         {report && (
//           <div className="mt-12 max-w-7xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:bg-white/15">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//   {/* Left section: Icon + Text */}
//   <div className="flex items-start md:items-center">
//     <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
//       <svg
//         className="w-8 h-8 text-white"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//         />
//       </svg>
//     </div>
//     <div className="ml-4">
//       <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
//         AI Analysis Report
//       </h3>
//       <p className="text-gray-300 text-sm mt-1">
//         Detailed comparison insights
//       </p>
//     </div>
//   </div>

//   {/* Right section: Buttons */}
//   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//     <button
//       onClick={() => navigator.clipboard.writeText(report)}
//       className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-2xl transition-all flex items-center font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//     >
//       <svg
//         className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//         />
//       </svg>
//       Copy Report
//     </button>
//     <button
//       onClick={handleExportPdf}
//       className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-2xl transition-all flex items-center font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//     >
//       <svg
//         className="w-5 h-5 mr-2"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M12 8v4m0 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H7l-2 2v12a2 2 0 002 2z"
//         />
//       </svg>
//       Export PDF
//     </button>
//   </div>
// </div>

//               <div
//                 dir="rtl"
//                 className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
//               >
//                 <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed">
//                   {report.split("\n").map((paragraph, i) => (
//                     <p
//                       key={i}
//                       className="mb-4 last:mb-0 text-justify hover:text-white transition-colors duration-200"
//                     >
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               {/* Statistics Footer */}
//               <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-blue-500/20 p-4 rounded-xl text-center border border-blue-500/30">
//                   <div className="text-2xl font-bold text-blue-300">AI</div>
//                   <div className="text-sm text-gray-300">Powered Analysis</div>
//                 </div>
//                 <div className="bg-purple-500/20 p-4 rounded-xl text-center border border-purple-500/30">
//                   <div className="text-2xl font-bold text-purple-300">⚡</div>
//                   <div className="text-sm text-gray-300">Lightning Fast</div>
//                 </div>
//                 <div className="bg-green-500/20 p-4 rounded-xl text-center border border-green-500/30">
//                   <div className="text-2xl font-bold text-green-300">✓</div>
//                   <div className="text-sm text-gray-300">High Precision</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="text-center mt-16 text-gray-400">
//           <p className="text-sm">
//             Powered by advanced AI • Built with ❤️ for pixel-perfect comparisons
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;








import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Image, Loader2, CheckCircle, AlertCircle, Camera, BarChart3, Globe, Zap } from 'lucide-react';

const Home = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isExportingShapefile, setIsExportingShapefile] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);

  const handleFileSelect = (file, imageNumber) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imageNumber === 1) {
          setImage1(file);
          setImage1Preview(e.target.result);
        } else {
          setImage2(file);
          setImage2Preview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('يرجى اختيار ملف صورة صالح');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, imageNumber) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, imageNumber);
  };

  const analyzeImages = async () => {
    if (!image1 || !image2) {
      setError('يرجى اختيار صورتين للمقارنة');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);

    try {
      const response = await fetch('https://ai-images-change-detetction-backend.fly.dev/api/compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
      setSuccess('تم تحليل الصور بنجاح!');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`فشل في تحليل الصور: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReport = async () => {
    if (!analysisResult) {
      setError('لا توجد نتائج تحليل لإنشاء تقرير');
      return;
    }

    setIsGeneratingReport(true);
    setError(null);

    try {
      const response = await fetch('https://ai-images-change-detetction-backend.fly.dev/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image1Base64: image1Preview,
          image2Base64: image2Preview,
          diffImageBase64: analysisResult.diffImage,
          reportText: analysisResult.summary,
          analysisMetadata: analysisResult.analysisMetadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `satellite-analysis-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setSuccess('تم تحميل التقرير بنجاح!');
    } catch (err) {
      console.error('Report generation error:', err);
      setError(`فشل في إنشاء التقرير: ${err.message}`);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const exportShapefile = async () => {
    if (!analysisResult) {
      setError('لا توجد نتائج تحليل لتصدير Shapefile');
      return;
    }

    setIsExportingShapefile(true);
    setError(null);

    try {
      const response = await fetch('https://ai-images-change-detetction-backend.fly.dev/api/export-shapefile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diffImageBase64: analysisResult.diffImage,
          width: 512,
          height: 512,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `change-detection-shapefile-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setSuccess('تم تحميل Shapefile بنجاح!');
    } catch (err) {
      console.error('Shapefile export error:', err);
      setError(`فشل في تصدير Shapefile: ${err.message}`);
    } finally {
      setIsExportingShapefile(false);
    }
  };

  const resetAnalysis = () => {
    setImage1(null);
    setImage2(null);
    setImage1Preview(null);
    setImage2Preview(null);
    setAnalysisResult(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  نظام تحليل الصور الفضائية
                </h1>
                <p className="text-blue-300/80 text-sm">تحليل التغيرات باستخدام الذكاء الاصطناعي</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-blue-300">
              <Zap className="w-4 h-4" />
              <span>مدعوم بـ KNN Algorithm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300">{success}</p>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Image 1 Upload */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <Camera className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold">الصورة الأولى</h3>
            </div>
            
            <div
              className="border-2 border-dashed border-blue-400/30 rounded-xl p-8 text-center hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 1)}
              onClick={() => fileInput1Ref.current?.click()}
            >
              {image1Preview ? (
                <div className="space-y-4">
                  <img
                    src={image1Preview}
                    alt="Preview 1"
                    className="max-w-full h-48 object-cover rounded-lg mx-auto shadow-lg"
                  />
                  <p className="text-blue-300 text-sm">{image1?.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-blue-400 mx-auto" />
                  <div>
                    <p className="text-blue-300 font-medium">اسحب وأفلت الصورة هنا</p>
                    <p className="text-blue-400/60 text-sm mt-1">أو انقر للتصفح</p>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInput1Ref}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0], 1)}
              className="hidden"
            />
          </div>

          {/* Image 2 Upload */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <Camera className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold">الصورة الثانية</h3>
            </div>
            
            <div
              className="border-2 border-dashed border-green-400/30 rounded-xl p-8 text-center hover:border-green-400/50 transition-all duration-300 cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 2)}
              onClick={() => fileInput2Ref.current?.click()}
            >
              {image2Preview ? (
                <div className="space-y-4">
                  <img
                    src={image2Preview}
                    alt="Preview 2"
                    className="max-w-full h-48 object-cover rounded-lg mx-auto shadow-lg"
                  />
                  <p className="text-green-300 text-sm">{image2?.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-green-400 mx-auto" />
                  <div>
                    <p className="text-green-300 font-medium">اسحب وأفلت الصورة هنا</p>
                    <p className="text-green-400/60 text-sm mt-1">أو انقر للتصفح</p>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInput2Ref}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files[0], 2)}
              className="hidden"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={analyzeImages}
            disabled={!image1 || !image2 || isAnalyzing}
            className="flex items-center space-x-3 rtl:space-x-reverse px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            {isAnalyzing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <BarChart3 className="w-5 h-5" />
            )}
            <span>{isAnalyzing ? 'جاري التحليل...' : 'تحليل الصور'}</span>
          </button>

          <button
            onClick={resetAnalysis}
            className="flex items-center space-x-3 rtl:space-x-reverse px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300"
          >
            <span>إعادة تعيين</span>
          </button>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Diff Image */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <Image className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold">خريطة التغيرات</h3>
                <div className="bg-purple-500/20 px-3 py-1 rounded-full text-sm text-purple-300">
                  {analysisResult.diffPercentage} تغيير
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <img
                    src={analysisResult.diffImage}
                    alt="Difference Map"
                    className="w-full rounded-lg shadow-lg border border-white/20"
                  />
                  
                  {/* Color Legend */}
                  <div className="bg-black/20 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-purple-300 mb-3">دليل الألوان:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>زيادة/نمو</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>انخفاض/تراجع</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>تغيرات بيئية</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <span>لا يوجد تغيير</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-3">الإحصائيات:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>إجمالي البكسلات:</span>
                        <span className="font-mono text-blue-300">
                          {analysisResult.analysisMetadata?.totalPixels?.toLocaleString('ar-EG') || 'غير متوفر'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>البكسلات المتغيرة:</span>
                        <span className="font-mono text-red-300">
                          {analysisResult.analysisMetadata?.changedPixels?.toLocaleString('ar-EG') || 'غير متوفر'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>نسبة التغيير:</span>
                        <span className="font-mono text-purple-300">{analysisResult.diffPercentage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={generateReport}
                      disabled={isGeneratingReport}
                      className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300"
                    >
                      {isGeneratingReport ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                      <span>{isGeneratingReport ? 'جاري إنشاء التقرير...' : 'تحميل التقرير PDF'}</span>
                    </button>

                    <button
                      onClick={exportShapefile}
                      disabled={isExportingShapefile}
                      className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all duration-300"
                    >
                      {isExportingShapefile ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                      <span>{isExportingShapefile ? 'جاري تصدير Shapefile...' : 'تصدير Shapefile'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <FileText className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold">تحليل مفصل</h3>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="bg-black/20 rounded-lg p-6 text-right leading-relaxed text-gray-200 whitespace-pre-wrap">
                  {analysisResult.summary}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-blue-300/60">
            <div>
              <p>© 2024 نظام تحليل الصور الفضائية - مدعوم بالذكاء الاصطناعي</p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span>دقة التحليل: 512x512</span>
              <span>•</span>
              <span>خوارزمية KNN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;