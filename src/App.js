import './App.css';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [text1, setText1] = useState("");
  const [editing1, setEditing1] = useState(false);
  const [text2, setText2] = useState("");
  const [editing2, setEditing2] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [fileFormat, setFileFormat] = useState('png');


  const handleSave = () => {
    const container = document.querySelector('.image-collage-app-container');
    html2canvas(container).then(canvas => {
      canvas.toBlob(blob => {
        const extension = fileFormat === 'png' ? 'png' : 'jpeg';
        saveAs(blob, `collage.${extension}`);
      }, `image/${fileFormat}`);
    });
  };

  const handleFormatChange = (event) => {
    setFileFormat(event.target.value);
  };

  const handleText1Change = (e) => {
    setText1(e.target.value);
  };

  const handleText1Blur = () => {
    setEditing1(false);
  };

  const handleText1Click = () => {
    setEditing1(true);
  };

  const handleText2Change = (e) => {
    setText2(e.target.value);
  };

  const handleText2Blur = () => {
    setEditing2(false);
  };

  const handleText2Click = () => {
    setEditing2(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  };


  const handleImage1Change = (event) => {
    setLoading1(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage1(reader.result);
      setLoading1(false);
    };
  };

  const handleImage2Change = (event) => {
    setLoading2(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage2(reader.result);
      setLoading2(false);
    };
  };

  return (
    <div className="image-collage-app">
      <h1 className="image-collage-welcome">React Collage App</h1>
      <p className="image-collage-desc">Use Enter + Shift for multiple lines.</p>
      <button className="image-collage-btn" onClick={handleSave}>Save as PNG</button>
      <div className="image-collage-select">
        <label>
          File format:
          <select value={fileFormat} onChange={handleFormatChange}>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </label>
      </div>
      <div className="image-collage-app-container">
        <div className="text-container" >
          {editing1 ? (
            <textarea
              value={text1}
              onChange={handleText1Change}
              onBlur={handleText1Blur}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p className="editable-p1" onClick={handleText1Click} onKeyDown={handleKeyDown}>
              {text1 ? (
                text1.split("\n").map((line, index) => {
                  return <div key={index}>{line}</div>;
                })
              ) : (
                <span className="placeholder-text">
                  Click to add text 1
                </span>
              )}
            </p>
          )}

          {editing2 ? (
            <textarea
              value={text2}
              onChange={handleText2Change}
              onBlur={handleText2Blur}
              autoFocus
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p className="editable-p2" onClick={handleText2Click} onKeyDown={handleKeyDown}>
              {text2 ? (
                text2.split("\n").map((line, index) => {
                  return <div key={index}>{line}</div>;
                })
              ) : (
                <span className="placeholder-text">
                  Click to add text 2
                </span>
              )}
            </p>
          )}
        </div>

        <div className="image1">
          {loading1 ? (
            <p>Loading...</p>
          ) : image1 ? (
            <img src={image1} alt="Image 1" />
          ) : (
            <p className="image-p">Insert image here</p>
          )}
          {!loading1 && <input type="file" onChange={handleImage1Change} />}
        </div>
        <div className="image2">
          {loading2 ? (
            <p>Loading...</p>
          ) : image2 ? (
            <img src={image2} alt="Image 2" />
          ) : (
            <p className="image-p">Insert image here</p>
          )}
          {!loading2 && <input type="file" onChange={handleImage2Change} />}
        </div>
      </div>
    </div>
  );
}

export default App;
