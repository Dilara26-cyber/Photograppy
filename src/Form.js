import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Options, resetOpt } from './Options';
import '../src/assets/Form.scss';
import { RiUploadLine } from 'react-icons/ri';
import { RiDownloadLine } from 'react-icons/ri';
import { BiUndo } from 'react-icons/bi';
const Form = (props) => {
  const [url, setUrl] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [options, setOptions] = useState(Options);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex];
  const [value, setValue] = useState(selectedOption.value);
  const [reset, setReset] = useState(false);
  const resetedValue = resetOpt[selectedOptionIndex].value;
  const [ctx, setCtx] = useState({});
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  let filters;

  //Function for uploading image
  const loadTheImage = ({ target }) => {
    const file = target.files[0].type.split('/');
    const fileType = file[0];
    if (fileType.startsWith('image')) {
      setUrl(URL.createObjectURL(target.files[0]));
    }
  };
  //Function that sets image filters for app
  const setImageStyle = useCallback(() => {
    filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    if (ctx) {
      ctx.filter = filters.join(' ');
      return ctx.filter;
    }
  });
  //Function that resets the value
  const resetTheValue = () => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        setReset(true);

        console.log(value);
        setValue(resetedValue);
        return { ...option, value: value };
      });
    });
  };
  useEffect(() => {
    const image = imgRef.current;
    const isLoaded = image.complete && image.naturalHeight !== 0;
    const canvas = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
    };
    return () => {
      if (isLoaded) {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        ctx.filter = setImageStyle();
        setDownloadLink(canvas.toDataURL('image/png'));
      }
    };
  }, [url, value, ctx, setImageStyle]);
  useEffect(() => {
    const image = imgRef.current;
    if (reset === true) {
      ctx.filter =
        'brightness(100%) contrast(100%) saturate(100%) grayscale(0%) sepia(0%) hue-rotate(0deg) blur(0px)';
      ctx.drawImage(image, 0, 0, image.width, image.height);
    }
  });

  function handleSliderChange({ target }) {
    setReset(false);
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        setValue(target.value);
        return { ...option, value: value };
      });
    });
  }

  return (
    <section className="Form container" id="app">
      <div className="form__image">
        <form action="#" className="container">
          <label htmlFor="photo" className="label__photo" title="upload image">
            <RiUploadLine />
            Upload Image
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/jpeg, image/png, image/svg"
            onChange={loadTheImage}
            title="upload image"
          />
        </form>
        <div className="img__container container">
          <div className="img">
            {' '}
            <canvas ref={canvasRef} />
            <img
              src={url}
              alt={url ? 'Uploaded Picture' : 'Please upload an image.'}
              ref={imgRef}
              className="uploaded"
            />{' '}
          </div>
          {url && (
            <div className="undo">
              <button className="reset" onClick={resetTheValue}>
                <BiUndo />
              </button>
              <a
                href={downloadLink}
                download="edited_photo"
                title="Download"
                className="download"
              >
                <RiDownloadLine />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="options">
        {options.map((option, index) => {
          return (
            <button
              key={index}
              className={
                selectedOptionIndex === index
                  ? 'options__item active'
                  : 'options__item'
              }
              onClick={() => {
                setSelectedOptionIndex(index);
              }}
            >
              {option.name}
            </button>
          );
        })}
      </div>
      <div className="slider">
        <label htmlFor="range" className="range__label">
          Change the coloring:
        </label>
        <input
          type="range"
          name="range"
          id="range"
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          onChange={handleSliderChange}
        />
      </div>
    </section>
  );
};

export default Form;
