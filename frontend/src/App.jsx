import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [inputText, setInputText] = useState("");  // State to store the input text
  const [translatedText, setTranslatedText] = useState("");  // State to store the translated text
  const [selectedLanguage, setSelectedLanguage] = useState("");  // State to store the selected language

  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent form from submitting the default way
    try {
      // Sending the post request with text
      const response = await axios.post("http://localhost:5000/api/translate", {
        text: inputText,
        selectedLanguage: selectedLanguage,
      });
      // Log the response to check the structure
      console.log("Response data:", response.data);
      // Validating and setting the translated text
      if (response.data && response.data.translatedText) {
        setTranslatedText(response.data.translatedText);
      } else {
        alert("Translation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      alert("An error occurred during translation.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy text:", err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "90%" }}>
        <Stack direction="horizontal" gap={3} style={{ width: "100%" }}>
          <div className="p-2" style={{ flexGrow: 1 }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter text in English to translate</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  style={{ resize: "none", fontSize: "1.2em" }}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}  // Update state on input change
                />
              </Form.Group>
            </Form>
          </div>
          <Button variant="secondary" onClick={handleCopy}>
                Copy Translated Text
              </Button>
          <div className="p-2" style={{ flexGrow: 1 }}>
            
            <Form>
            
              <Form.Group className="mb-3">
                <Form.Label>Translated Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  style={{ resize: "none", fontSize: "1.2em" }}
                  value={translatedText}  // Display the translated text
                  readOnly
                />
              </Form.Group>
             
            </Form>
          </div>
        </Stack>
        <div className="d-flex justify-content-center mt-3">
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <Form.Group className="mb-3" style={{ width: "100%" }}>
              
              <Form.Select
                aria-label="Default select example"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">Select a language</option>
                <option value="es">Spanish</option>
                <option value="ar">Arabic</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="ru">Russian</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default App;
