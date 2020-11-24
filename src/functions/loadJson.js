export const loadFile = (e, loadFigure) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    const newFile = reader.result;
    loadFigure(JSON.parse(newFile));
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
  reader.loadend = function () {
    reader.abort();
  };
  e.target.value = "";
};
