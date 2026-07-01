import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (history) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("SmartMess AI Report", 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    30
  );

  autoTable(doc, {
    startY: 40,
    head: [["Date", "Breakfast", "Lunch", "Dinner", "Waste (KG)"]],
    body: history.map((item) => [
      new Date(item.date).toLocaleDateString(),
      item.breakfast,
      item.lunch,
      item.dinner,
      item.predictedWaste,
    ]),
  });

  doc.save("SmartMess_AI_Report.pdf");
};

export default exportPDF;