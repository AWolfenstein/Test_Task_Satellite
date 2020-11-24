export const downloadJsonFile = () => {
  const localFigures = JSON.stringify(
    JSON.parse(localStorage.getItem("figures"))
  );
  if (localFigures) {
    const element = document.createElement("a");
    const file = new Blob([localFigures], {
      type: "application/json;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "output.json";
    document.body.appendChild(element);
    element.click();
    } else {
    alert("No data to download!");
  }
};
