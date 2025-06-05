import { LitElement, html, css } from 'lit';

export class ImageUploader extends LitElement {
  static properties = {
    imageUrl: { type: String }
  };

  static styles = css`
    .upload-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin: 1rem 0;
    }
    .preview {
      max-width: 200px;
      max-height: 200px;
      border: 1px solid #ccc;
      object-fit: contain;
    }
  `;

  constructor() {
    super();
    this.imageUrl = '';
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.dispatchEvent(new CustomEvent('image-uploaded', {
          detail: { imageUrl: this.imageUrl },
          bubbles: true,
          composed: true
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    return html`
      <div class="upload-container">
        <label>
          <strong>Upload Logo/Image:</strong>
          <input type="file" @change=${this.handleImageUpload} accept="image/*" />
        </label>
        ${this.imageUrl ? html`
          <img class="preview" src="${this.imageUrl}" alt="Preview" />
        ` : ''}
      </div>
    `;
  }
}

customElements.define('image-uploader', ImageUploader);
