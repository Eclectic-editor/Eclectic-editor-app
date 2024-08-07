<div align=center>

# EclecticEditor

<img width="800" alt="Notion Cover" src="https://github.com/user-attachments/assets/a21f95c5-4222-4ae5-8dc9-7184013330c4">

Eclectic Editor는 Electron으로 개발된 <b>CSS 편집기</b>로, 사용자가 원하는 URL을 입력하면 해당 웹사이트의 CSS를 <b>직관적으로 편집할 수 있는 도구</b>입니다. 사용자는 웹 페이지의 요소를 클릭하여 <b>실시간으로 스타일을 변경</b>하고, <b>다양한 해상도</b>에서의 변화를 즉시 확인할 수 있습니다. 수정된 스타일은 JSON 파일로 저장할 수 있어 개발자에게 쉽게 전달할 수 있으며, 이를 통해 협업과 의사소통이 원활해집니다.

<br>

## 🔗 Links

배포 오류가 있어 수정 후 압축 파일 제공 예정

<br>

## 🔧 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white">
<br>
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/zustand-8A385D?style=for-the-badge">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">

<br>

</div>

## 🗂️ 목차

- [**🎨 EclecticEditor**](#EclecticEditor)
- [**🔗 Links**](#Links)
- [**💡 기획 동기**](#기획-동기)
- [**🔧 기술 스택**](#기술-스택)
- [**🔎 기능 설명**](#기능-설명)
- [**☄️ 기술 챌린지**](#기술-챌린지)
- [**💬 프로젝트 회고**](#프로젝트-회고)

## 💡 기획 동기

웹 개발 과정에서 디자인 변경과 스타일 수정은 자주 발생하는 작업입니다. 특히 프로젝트의 후반부나 유지보수 단계에서 클라이언트나 팀 내부에서 디자인 변경 요청이 들어올 때가 많습니다. 이런 상황에서 개발자나 퍼블리셔가 직접 코드를 수정하는 것은 시간과 비용 면에서 비효율적입니다.

예를 들어, 클라이언트가 급하게 특정 페이지의 색상이나 폰트 크기를 변경해달라고 요청하는 경우가 있습니다. 또는 A/B 테스트를 위해 여러 버전의 디자인을 빠르게 적용해보고 싶은 상황도 있습니다. 이런 경우, 개발 일정에 영향을 주지 않으면서도 신속하게 변경사항을 적용하고 확인할 수 있는 도구가 필요했습니다.

또한, 디자이너와 개발자 사이의 의사소통을 개선할 필요도 자주 느꼈습니다. 디자이너가 원하는 정확한 스타일을 개발자에게 전달하는 과정에서 오해가 생기거나 시간이 지체되는 경우가 많았습니다. 직접 스타일을 조정하고 그 결과를 즉시 확인할 수 있는 도구가 있다면 이러한 의사소통의 문제를 줄일 수 있을 것이라고 생각했습니다.

이런 생각을 하다 보니, **"개발 지식이 없는 사람들도 웹페이지의 스타일을 쉽게 수정할 수 있다면 어떨까?"** 라는 의문이 들었습니다. 이 질문은 실제 업무 현장에서 겪었던 문제들에 대한 해결책을 찾게 했습니다. 디자이너, 마케터, 기획자 등 다양한 팀 구성원들이 직접 웹페이지를 수정할 수 있다면 많은 이점을 제공할 것이라 생각합니다.

이런 아이디어를 바탕으로 Eclectic Editor 프로젝트를 기획하게 되었습니다.

<br>

## 🔎 기능 설명

### 1. URL 입력 시 해당 웹사이트로 이동

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="url입력" src="https://github.com/user-attachments/assets/1412e68f-30aa-4cff-9e91-b000192f041b"/>
</details>
URL을 입력하면 해당 웹사이트와 CSS 편집기 화면으로 넘어갑니다.

<br>

### 2. CSS 편집

#### 2-1. Font

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_font" src="https://github.com/user-attachments/assets/3c4ab331-2f39-40ab-917f-77ad3cc891c1"/>
</details>
font-family, color, font-size, line-height, font-weight, <br>
font-style, font-variant, text-decoration의 스타일을 수정할 수 있습니다.

<br>

#### 2-2. Text

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_text" src="https://github.com/user-attachments/assets/aaad7f94-d935-4f23-8d38-c89074c28af4"/>
</details>
text-align, text-indent, text-transform, word-spacing, <br>
letter-spacing, word-wrap, white-space, vertical-align의 스타일을 수정할 수 있습니다.

<br>

#### 2-3. Background

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_background" src="https://github.com/user-attachments/assets/5f81cb3a-d80c-451d-8881-b60d6d6d40f4"/>
</details>
background-color, background-image, background-position, <br>
background-size, background-blendmode, background-attachment의 스타일을 수정할 수 있습니다.

<br>

#### 2-4. Dimensions

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_dimensions" src="https://github.com/user-attachments/assets/f466261e-ada2-43ab-902a-659be93b03e8"/>
</details>
width, height, max-width, max-height, <br>
min-width, min-height의 스타일을 수정할 수 있습니다.

<br>

#### 2-5. Spacing

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_spacing" src="https://github.com/user-attachments/assets/916fd91a-001c-4b60-aec4-f9e6d32b86fa"/>
</details>
padding, margin의 스타일을 수정할 수 있습니다.

<br>

#### 2-6. Border

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="css_border" src="https://github.com/user-attachments/assets/71af9549-788c-41f0-b14f-4c4bfc83dfda"/>
</details>
border-width, border-color, border-color, border-radius의 스타일을 수정할 수 있습니다.

<br>

### 3. 해상도 선택

#### 3-1. 단일 모드

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="single_mode" src="https://github.com/user-attachments/assets/5acd4072-9eaf-4e5b-8688-b135fc06a06e"/>
</details>
모바일, 태블릿, 데스크탑의 단일 화면을 선택 및 스타일 수정을 할 수 있습니다.
가로/세로 전환 모드가 가능합니다.
원하는 크기로 설정이 가능합니다.

<br>

#### 3-2. 멀티 모드

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="multi_mode" src="https://github.com/user-attachments/assets/6f8988d1-64c6-43e4-821e-111c4cf724bd"/>
</details>
모바일, 태블릿, 데스크탑을 한 화면으로 확인할 수 있습니다.
모든 해상도의 스크롤이 동기화 됩니다.
가로/세로 전환 모드가 가능합니다.
원하는 크기로 설정이 가능합니다.

<br>

### 4. 수정된 스타일 JSON 파일로 저장

<details>
<summary>
  📺 미리보기
</summary>
  <br>
  <img alt="json_save" src="https://github.com/user-attachments/assets/f02fada7-c2e7-40f6-a0e9-292ca97b639d"/>
</details>
xPath와 변경된 스타일을 json 파일로 확인할 수 있습니다.

<br>

## ☄️ 기술 챌린지

## 1. 웹 페이지와 데스크톱 애플리케이션 간의 스타일 수정, 어떻게 가능할까?

### 1-1. 웹 페이지와 데스크톱 애플리케이션 간의 통신 구현 방법은?

Eclectic Editor에서는 사용자가 웹 페이지의 요소를 클릭하고, 이를 편집하는 기능을 제공합니다. EditorView는 사용자가 요소의 스타일을 변경할 수 있는 인터페이스를 제공하고, WebpageView는 실제 웹 페이지를 표시합니다. 이 두 뷰는 서로 독립적인 렌더러 프로세스로 동작하기 때문에, 직접적인 데이터 교환이 불가능하여 요소 클릭 정보를 EditorView로 전달하는 과정이 필요했습니다.

![Group 24](https://github.com/user-attachments/assets/7f736fd1-8233-4b01-b4e0-04c77f2634f1)

이 문제를 해결하기 위해 우리는 Electron의 IPC(Inter-Process Communication) 메커니즘을 활용했습니다. 아래 이미지에서 볼 수 있듯이, 통신 과정은 다음과 같은 순서로 이루어집니다.

![Group 27](https://github.com/user-attachments/assets/27d25177-bc72-4172-8652-fc3d97f25312)

<br>

**WebpageView에서 클릭된 요소의 정보 수집**

- 사용자가 웹 페이지에서 특정 요소를 클릭하면 해당 요소의 정보가 수집됩니다.

```jsx
document.body.addEventListener('click', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const elementInfo = {
    tagName: event.target.tagName,
    classList: Array.from(event.target.classList),
    id: event.target.id,
    outerHTML: event.target.outerHTML,
    zippy:
      event.target.dataset.zippy || (await window.electronAPI.generateUUID()),
  };
  window.electronAPI.elementClicked(elementInfo);
});
```

<br>

**preload.js를 통해 메인 프로세스(ipcMain)로 정보 전달**

- `preload.js`에서 `ipcRenderer`를 통해 정보를 메인 프로세스로 전달합니다.

```jsx
contextBridge.exposeInMainWorld('electronAPI', {
  elementClicked: (data) => ipcRenderer.send('element-clicked', data),
  generateUUID: async () => {
    const { v4: uuidv4 } = await import('uuid');
    return uuidv4();
  },
});
```

<br>

**메인 프로세스(main.js)에서 정보 수신 및 EditorView로 전달**

- 메인 프로세스에서 정보를 수신하고, `EditorView`로 전달합니다.

```jsx
ipcMain.on('element-clicked', (event, elementInfo) => {
  editorView.webContents.send('element-info', elementInfo);
});
```

<br>

**EditorView에서 정보 수신 및 처리:**

- `EditorView`에서 정보를 수신하고, 상태를 업데이트합니다.

```jsx
useEffect(() => {
  const handleElementClicked = (event, elementInfo) => {
    setSelectedElement(elementInfo);
  };
  window.electronAPI.receive('element-info', handleElementClicked);
  return () => {
    window.electronAPI.removeListener('element-info', handleElementClicked);
  };
}, []);
```

이러한 접근 방식을 통해 WebpageView에서 선택된 요소의 정보를 EditorView로 안전하게 전달할 수 있게 되었습니다.

<br>

### 1-2. 고유 식별자를 사용해 요소를 어떻게 선택할까?

처음에는 클릭된 요소를 클래스와 텍스트 이름으로 식별하려고 했습니다. 그러나 이 방법은 요소가 중복될 가능성이 크다는 문제점이 있었습니다. 예를 들어, 동일한 클래스명을 가진 여러 요소가 있는 경우 정확히 어느 요소가 클릭되었는지 식별하는 데 어려움이 있었습니다.

이 문제를 해결하기 위해 클릭한 요소에 대해 UUID(Universally Unique Identifier)를 사용하기로 결정했습니다. UUID는 고유성을 보장하므로 각 요소에 고유한 식별자를 부여할 수 있습니다.

[[코드 추가 예정]]

<br>

## 2. 모바일, 태블릿, 데스크탑을 한 화면에 출력되게 하려면?

### 2-1. UUID 대신 xPath를 사용해 요소를 어떻게 식별할까?

멀티모드에서는 동일한 웹 페이지를 모바일, 태블릿, 데스크탑 세 가지 해상도로 동시에 출력해야 합니다. 이를 위해 각각의 해상도에 대해 WebpageView를 3개로 구현했습니다. 이러한 상황에서 동일한 스타일 변경을 모든 WebpageView에 적용하는 과정에서 문제가 발생했습니다.

초기 구현에서는 각 요소에 UUID를 부여하여 식별했습니다. 예를 들어, 사용자가 모바일 뷰에서 특정 요소를 클릭하여 스타일을 변경하면 해당 요소에 UUID가 부여됩니다. 그러나 이 방식에는 문제가 있었습니다. UUID는 각 요소에 고유하게 부여되기 때문에, 동일한 요소를 다른 WebpageView에서 식별하는 것이 어려웠습니다. 예를 들어, 모바일 뷰에서 특정 요소를 클릭하여 스타일을 변경한 후, 동일한 스타일을 태블릿이나 데스크탑 뷰에서도 적용하려고 할 때, 해당 요소를 정확히 식별할 수 없었습니다. 따라서 동일한 스타일을 다른 뷰에 일관되게 적용하기 위해서는 다른 방법이 필요했습니다.

이 문제를 해결하기 위해 UUID 대신 xPath를 사용하기로 결정했습니다. xPath는 요소의 위치를 명확하게 지정할 수 있기 때문에, 동일한 요소를 여러 뷰에서 일관되게 식별할 수 있습니다. 이를 통해 요소의 정확한 위치를 식별할 수 있게 되었고, 각 뷰에서 동일한 스타일을 적용할 수 있었습니다.

<br>

### 2-2. 여러 해상도의 뷰 간 스크롤을 어떻게 동기화할까?

<br>

## 3. 선택한 요소의 수정한 속성을 기억할 순 없을까?

웹 페이지의 요소를 선택하고 스타일을 수정할 때, 수정된 내역을 추적하고 이를 UI에 반영하여 수정된 속성을 강조하는 기능이 필요하다고 느꼈습니다. 이를 통해 사용자는 자신이 수정한 내용을 쉽게 파악할 수 있고, 동일한 속성을 여러 번 변경하더라도 일관성 있게 관리할 수 있습니다. 이 기능은 초기 칸반 태스크에는 없었지만, 사용성을 고려해 추가하게 되었습니다.

먼저, 요소별로 수정 내역을 저장할 수 있도록 Zustand 상태 관리를 설정했습니다. 상태는 `modifiedElements` 객체에 저장되며, 각 요소의 XPath를 키로 사용하여 수정된 영역과 속성을 저장합니다. 이를 통해 각 요소별로 수정 내역을 추적하고, UI에 뱃지 형태로 표시할 수 있게 되었습니다.

## 💬 프로젝트 회고
