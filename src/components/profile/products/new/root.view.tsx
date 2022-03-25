import { Container, Alert, Form, Row, Col, Modal, InputGroup, Button } from "react-bootstrap";
import { useState } from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { ThreeDots } from 'react-loading-icons';

import { useAuth } from "../../../../methods/auth";

import Script from './script.view';
import axios from "axios";

function PreviewProductView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFormattingModal, setShowFormattingModal] = useState<boolean>(false);
  const [fileInputs, setFileInputs] = useState<string[]>(['']);
  const [type, setType] = useState<string>('none');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let fileI = fileInputs.findIndex(f => f == '');
    formData.delete(`file${fileI}`);

    //formData.append('keywords', tags);
    formData.append('type', type);

    axios.post('http://localhost/products', formData, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then(() => {

    }).catch(err => {
      setLoading(false)
      
      setError(err.response.data);
    });
  }

  const addTags = (tags: string[]) => {
    let lastIndex = (tags.length > 0 ? tags.length : 1) - 1;

    if(tags.length != 0){
      tags[lastIndex] = tags[lastIndex].replaceAll(/[^A-Za-z0-9]+/g, '');
      
      const tagIndex = tags.findIndex((t, i) => t == tags[lastIndex] && i != lastIndex);
      if(tags[lastIndex] == '' || tagIndex != -1)
        tags.splice(lastIndex, 1);
    }
    
    setTags(tags);
  }

  const addFileField = (e : React.ChangeEvent<HTMLInputElement>, i : number) => {
    let fileI = fileInputs.findIndex(f => f == e.target.value);
    if(e.target.value && fileI == -1){
      const tempFileArr = fileInputs.concat('');
      tempFileArr[i] = e.target.value;
      setFileInputs(tempFileArr);
    }else if(fileI != -1 && fileI != i)
      e.target.value = '';
    
  }

  const removeFileField = (i : number) => {
    const tempFileArr = [...fileInputs];
    tempFileArr.splice(i, 1);
    setFileInputs(tempFileArr);
  }

  return (
    <Container className="mt-3 mb-3">
      {error && (<>
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      </>)}
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select onChange={(e) => setType(e.target.value)} defaultValue={type}>
          <option value="none" disabled> --- please select a type --- </option>
          <option value="scripts">Scripts</option>
          <option value="plugins">Plugins</option>
        </Form.Select>
      </Form.Group>
      <hr />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col lg={{ span: 7 }}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="My super awesome product" disabled={type == 'none'} required />
            </Form.Group>
          </Col>
          <Col lg={{ span: 3 }}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <Form.Control name="price" type="number" defaultValue="0" step="0.01" min="0" disabled={type == 'none'} required />
                <Form.Select name="currency" className="small-select" defaultValue="EUR" disabled={type == 'none'}>
                  <option>EUR</option>
                  <option value="CNS">Coins</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col lg={{ span: 2 }}>
            <div className="d-grid gap-2 discount-button">
              <Button disabled={'none' == 'none'}>Discount</Button>
            </div>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" rows={3} disabled={type == 'none'} required />
          <Form.Text className="text-muted">
            <Button variant="link" className="p-0" onClick={() => setShowFormattingModal(true)}>How to format the description?</Button>
          </Form.Text>
          <Modal show={showFormattingModal} onHide={() => setShowFormattingModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>How to format the description?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Links vil automatisk blive market og behøver ikke længere [link]<br /><br />
              <b style={{fontWeight: "bold", color: "#767a7c"}}>[b]BOLD[/b]</b><br />
              <u>[u]UNDERLINE[/u]</u><br />
              <i>[i]ITALIC[/i]</i><br />
              <hr />
              <b style={{color: "#AA0000"}}>[darkred]DARKRED[/darkred]</b><br />
              <b style={{color: "#FF5555"}}>[red]RED[/red]</b><br />
              <b style={{color: "#FFAA00"}}>[gold]GOLD[/gold]</b><br />
              <b style={{color: "#FFFF55"}}>[yellow]YELLOW[/yellow]</b><br />
              <b style={{color: "#00AA00"}}>[darkgreen]DARKGREEN[/darkgreen]</b><br />
              <b style={{color: "#55FF55"}}>[green]GREEN[/green]</b><br />
              <b style={{color: "#55FFFF"}}>[aqua]AQUA[/aqua]</b><br />
              <b style={{color: "#00AAAA"}}>[darkaqua]DARKAQUA[/darkaqua]</b><br />
              <b style={{color: "#0000AA"}}>[darkblue]DARKBLUE[/darkblue]</b><br />
              <b style={{color: "#5555FF"}}>[blue]BLUE[/blue]</b><br />
              <b style={{color: "#FF55FF"}}>[lightpurple]LIGHTPURPLE[/lightpurple]</b><br />
              <b style={{color: "#AA00AA"}}>[darkpurple]DARKPURPLE[/darkpurple]</b><br />
              <b>[color:HEXCOLOR]CUSTOM[/color]</b> - Vælg din egen farve<br />
              <hr />
              [video]YOUTUBE_URL[/video]<br />
              <img className="img-fluid" src="https://mcskri.pt/img/yt_embed.png" title="" />
              <hr />
              [spoiler][summary]SUMMARY[/summary]SPOILER[/spoiler]<br />
              <img className="img-fluid" src="https://mcskri.pt/img/spoiler_text.png" title="" />
              <hr />
              [code]CODE[/code]<br />
              <img className="img-fluid" src="https://mcskri.pt/img/code_box.png" title="" />
            </Modal.Body>
          </Modal>
        </Form.Group>
        <Row>
          <Col lg={{ span: 6 }}>
            <Form.Group className="mb-3">
              <Form.Label>Keywords</Form.Label>
              <ReactTagInput tags={tags} onChange={addTags} removeOnBackspace={true} readOnly={type == 'none'} />
            </Form.Group>
          </Col>
          <Col lg={{ span: 4 }}>
            <Form.Group className="mb-3">
              <Form.Label>Version</Form.Label>
              <InputGroup>
                <Form.Control name="version" defaultValue="1.0.0" type="text" onBlur={(e) => {e.target.value = (e.target.value.match(/\d+(\.\d+)*/g) || [''])[0];}} disabled={type == 'none'} required />
                <Form.Select name="release" className="small-select" disabled={type == 'none'} required>
                  <option value="stable">Stable</option>
                  <option value="beta">Beta</option>
                  <option value="alpha">Alpha</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col lg={{ span: 2 }}>
            <Form.Group className="mb-3">
              <Form.Label>Visibility</Form.Label>
              <Form.Select name="visibility" disabled={type == 'none'} required>
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {type == 'scripts' && <Script />}

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Files</Form.Label>
        {fileInputs.map((f : string, index : number) => (
          <InputGroup className="mb-2" key={index}>
            <Form.Control name={`file${index}`} type="file" onChange={(e : React.ChangeEvent<HTMLInputElement>) => addFileField(e, index)} disabled={type == 'none'} required={index == 0} />
            {index != 0 && <Button onClick={() => removeFileField(index)}>Remove</Button>}
          </InputGroup>
        ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" disabled={type == 'none'} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={type == 'none' || loading}>
          {loading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}
        </Button>
      </form>
    </Container>
  );
}

export default PreviewProductView;