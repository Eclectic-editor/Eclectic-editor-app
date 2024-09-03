<div align=center>
<br>

<img width="151" alt="logo" src="https://github.com/user-attachments/assets/ac69aff0-204f-40c7-ac8f-084ac46064e6">

<br>

# Eclectic Editor

Eclectic Editor는 Electron 기반의 데스크톱 애플리케이션으로, <br>개발 지식이 없는 사용자도 간단한 조작만으로 웹 페이지의 CSS를 일시적으로 변경하고 그 결과를 <br>즉시 확인할 수 있는 도구입니다. 사용자가 입력한 URL의 웹사이트 스타일을 실시간으로 수정하며, <br>변경사항은 JSON 파일로 저장되어 개발자와의 협업을 원활하게 합니다.

<br>

<a href="https://github.com/Eclectic-editor/Eclectic-editor-app/releases/download/v1.0.0/eclectic-editor-darwin-x64-1.0.0.zip">Download Eclectic Editor</a>

<br>

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white">
<br>
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/zustand-8A385D?style=for-the-badge">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white">

<br>

</div>

<br><br>

# Contents

- [**Eclectic Editor ?**](#eclectic-editor-1)
- [**Features**](#features)
- [**Developmoent Focus**](#development-focus)
- [**Project Insights**](#project-insights)

<br><br>

# Eclectic Editor ?

웹 개발 과정에서 디자인 변경과 스타일 수정은 자주 발생하는 작업입니다. 예를 들어, A/B 테스트를 위해 여러 버전의 디자인을 빠르게 적용해보고 싶은 상황도 있습니다. 이런 경우, 개발 일정에 영향을 주지 않으면서도 신속하게 변경사항을 적용하고 확인할 수 있는 도구가 필요했습니다.

또한, 디자이너와 개발자 사이의 의사소통을 개선할 필요도 자주 느꼈습니다. 디자이너가 원하는 정확한 스타일을 개발자에게 전달하는 과정에서 오해가 생기거나 시간이 지체되는 경우가 많았습니다. 직접 스타일을 조정하고 그 결과를 즉시 확인할 수 있는 도구가 있다면 이러한 의사소통의 문제를 줄일 수 있을 것이라고 생각했습니다.

이런 생각을 하다 보니, **"개발 지식이 없는 사람들도 웹페이지의 스타일을 쉽게 수정할 수 있다면 어떨까?"** 라는 의문이 들었습니다.

이에 사용자가 URL만 입력하면 해당 웹사이트의 CSS를 직관적으로 편집할 수 있는 서비스를 기획하게 되었습니다. 이 도구를 통해 디자인 변경 프로세스를 간소화하고, 개발자-디자이너 간 협업을 개선하며, 궁극적으로 웹 개발의 효율성을 높이는 것이 목표입니다.

<br><br>

# Features

## 1. URL 입력 시 해당 웹사이트와 CSS 편집 화면으로 이동

<details>
<summary>
  URL 입력
</summary>
  <br>
  <img alt="url입력" src="https://github.com/user-attachments/assets/1412e68f-30aa-4cff-9e91-b000192f041b">
</details>

<br><br>

## 2. CSS 편집

<details>
<summary>
  Font 편집
</summary>
  <br>
  <img alt="css_font" src="https://github.com/user-attachments/assets/3c4ab331-2f39-40ab-917f-77ad3cc891c1">
  <p>font-family, color, font-size, line-height, font-weight, <br>
font-style, font-variant, text-decoration의 스타일을 수정할 수 있습니다.</p>
</details>

<br>

<details>
<summary>
  Text 편집
</summary>
  <br>
  <img alt="css_text" src="https://github.com/user-attachments/assets/aaad7f94-d935-4f23-8d38-c89074c28af4"/>
<p>text-align, text-indent, text-transform, word-spacing, <br>
letter-spacing, word-wrap, white-space, vertical-align의 스타일을 수정할 수 있습니다.</p>
</details>

<br>

<details>
<summary>
  Background 편집
</summary>
  <br>
  <img alt="css_background" src="https://github.com/user-attachments/assets/5f81cb3a-d80c-451d-8881-b60d6d6d40f4"/>
<p>background-color, background-image, background-position, <br>
background-size, background-blendmode, background-attachment의 스타일을 수정할 수 있습니다.</p>
</details>

<br>

<details>
<summary>
  Dimensions 편집
</summary>
  <br>
  <img alt="css_dimensions" src="https://github.com/user-attachments/assets/f466261e-ada2-43ab-902a-659be93b03e8"/>
<p>width, height, max-width, max-height, <br>
min-width, min-height의 스타일을 수정할 수 있습니다.</p>
</details>

<br>

<details>
<summary>
  Spacing 편집
</summary>
  <br>
  <img alt="css_spacing" src="https://github.com/user-attachments/assets/916fd91a-001c-4b60-aec4-f9e6d32b86fa"/>
<p>padding, margin의 스타일을 수정할 수 있습니다.</p>
</details>

<br>

<details>
<summary>
  Border 편집
</summary>
  <br>
  <img alt="css_border" src="https://github.com/user-attachments/assets/71af9549-788c-41f0-b14f-4c4bfc83dfda"/>
<p>border-width, border-color, border-color, border-radius의 스타일을 수정할 수 있습니다.</p>
</details>

<br><br>

## 3. 해상도 선택

<details>
<summary>
  단일 모드
</summary>
  <br>
  <img alt="single_mode" src="https://github.com/user-attachments/assets/5acd4072-9eaf-4e5b-8688-b135fc06a06e"/>
<ul>
  <li>모바일, 태블릿, 데스크탑의 단일 화면을 선택 및 스타일 수정을 할 수 있습니다.</li>
  <li>가로/세로 전환 모드가 가능합니다.</li>
  <li>원하는 크기로 설정이 가능합니다.</li>
</ul>
</details>

<br>

<details>
<summary>
  멀티 모드
</summary>
  <br>
  <img alt="multi_mode" src="https://github.com/user-attachments/assets/6f8988d1-64c6-43e4-821e-111c4cf724bd"/>
<ul>
  <li>모바일, 태블릿, 데스크탑을 한 화면으로 확인할 수 있습니다.</li>
  <li>모든 해상도의 스크롤이 동기화 됩니다.</li>
  <li>가로/세로 전환 모드가 가능합니다.</li>
  <li>원하는 크기로 설정이 가능합니다.</li>
</ul>
</details>

<br><br>

## 4. 수정된 스타일 JSON 파일로 저장

<details>
<summary>
  JSON 파일 저장
</summary>
  <br>
  <img alt="json_save" src="https://github.com/user-attachments/assets/f02fada7-c2e7-40f6-a0e9-292ca97b639d"/>
<p>xPath와 변경된 스타일을 json 파일로 확인할 수 있습니다.</p>
</details>

<br><br>

# Development Focus

## 1. 웹 페이지와 데스크톱 애플리케이션 간의 스타일 수정, 어떻게 가능할까?

### 1-1. 웹 페이지와 데스크톱 애플리케이션 간의 통신 구현 방법은?

Eclectic Editor에서는 사용자가 웹 페이지의 요소를 클릭하고, 이를 편집하는 기능을 제공합니다. EditorView는 사용자가 요소의 스타일을 변경할 수 있는 인터페이스를 제공하고, WebpageView는 실제 웹 페이지를 표시합니다. 이 두 뷰는 서로 독립적인 렌더러 프로세스로 동작하기 때문에, 직접적인 데이터 교환이 불가능하여 요소 클릭 정보를 EditorView로 전달하는 과정이 필요했습니다.

<img src="https://github.com/user-attachments/assets/7f736fd1-8233-4b01-b4e0-04c77f2634f1" width="600"/>

이 문제를 해결하기 위해 Electron의 IPC(Inter-Process Communication) 메커니즘을 활용했습니다.
IPC는 서로 다른 프로세스 간에 데이터를 안전하게 주고받을 수 있게 해주는 시스템입니다.

<img src="https://github.com/user-attachments/assets/27d25177-bc72-4172-8652-fc3d97f25312" width="600"/>

<br>

구체적인 구현 과정은 다음과 같습니다.

1. `WebpageView`에서 요소 정보 수집: 사용자가 웹페이지에서 요소를 클릭하면, 해당 요소의 태그명, 클래스, ID 등의 정보를 수집합니다.
2. `preload.js`를 통한 정보 전달: 수집된 정보는 preload.js에서 ipcRenderer를 통해 메인 프로세스로 전달됩니다. 이 과정에서 contextBridge를 사용하여 보안을 강화했습니다.
3. 메인 프로세스에서 정보 처리: 메인 프로세스(main.js)에서는 전달받은 정보를 EditorView로 다시 전송합니다.
4. `EditorView`에서 정보 수신 및 처리: 마지막으로, EditorView에서 이 정보를 받아 상태를 업데이트하고 UI를 갱신합니다.

이러한 접근 방식을 통해 웹페이지와 데스크톱 앱 사이의 안전하고 효율적인 통신 채널을 구축할 수 있었습니다.

<br>

### 1-2. 고유 식별자를 사용해 요소를 어떻게 선택할까?

처음에는 클릭된 요소를 클래스와 텍스트 이름으로 식별하려고 했습니다. 그러나 이 방법은 요소가 중복될 가능성이 크다는 문제점이 있었습니다. 예를 들어, 동일한 클래스명을 가진 여러 요소가 있는 경우 정확히 어느 요소가 클릭되었는지 식별하는 데 어려움이 있었습니다.

<img src="https://github.com/user-attachments/assets/9d8d606b-d105-4198-8b2e-619ea0d57cb8" width="600"/>

이 문제를 해결하기 위해 UUID(Universally Unique Identifier)를 도입했습니다. 아래의 특징이 있어 각 요소에 고유한 식별자를 부여할 수 있습니다.

> UUID는 각 요소에 고유한 식별자를 부여할 수 있는 128비트의 숫자입니다.

- 고유성: 중복 가능성이 낮습니다.
- 범용성: 다양한 환경에서 독립적으로 생성 가능합니다.

<img src="https://github.com/user-attachments/assets/0c50a507-9cd4-4560-99c6-431bcd53aa47" width="600"/>

이 접근 방식은 단일 뷰에서 요소를 식별하는 데 효과적이었습니다. 하지만 여러 해상도의 뷰를 동시에 다루는 과정에서 새로운 문제가 발생했고, 이는 다음 섹션에서 다루겠습니다.

<br>

## 2. 모바일, 태블릿, 데스크탑을 한 화면에 출력되게 하려면?

### 2-1. UUID 대신 xPath를 사용해 요소를 어떻게 식별할까?

멀티모드에서는 동일한 웹 페이지를 모바일, 태블릿, 데스크탑 세 가지 해상도로 동시에 출력해야 합니다. 이를 위해 각각의 해상도에 대해 WebpageView를 3개로 구현했습니다. 이러한 상황에서 동일한 스타일 변경을 모든 WebpageView에 적용하는 과정에서 문제가 발생했습니다.

초기 구현에서는 각 요소에 UUID를 부여하여 식별했습니다. 예를 들어, 사용자가 모바일 뷰에서 특정 요소를 클릭하여 스타일을 변경하면 해당 요소에 UUID가 부여됩니다. 그러나 이 방식에는 문제가 있었습니다. UUID는 각 요소에 고유하게 부여되기 때문에, 동일한 요소를 다른 WebpageView에서 식별하는 것이 어려웠습니다. 예를 들어, 모바일 뷰에서 특정 요소를 클릭하여 스타일을 변경한 후, 동일한 스타일을 태블릿이나 데스크탑 뷰에서도 적용하려고 할 때, 해당 요소를 정확히 식별할 수 없었습니다. 따라서 동일한 스타일을 다른 뷰에 일관되게 적용하기 위해서는 다른 방법이 필요했습니다.

<img src="https://github.com/user-attachments/assets/070973da-10ae-49d0-a2c2-30ee057764ec" width="600"/>

이 문제를 해결하기 위해 UUID 대신 xPath를 사용하기로 결정했습니다. xPath는 요소의 위치를 명확하게 지정할 수 있기 때문에, 동일한 요소를 여러 뷰에서 일관되게 식별할 수 있습니다. 이를 통해 요소의 정확한 위치를 식별할 수 있게 되었고, 각 뷰에서 동일한 스타일을 적용할 수 있었습니다.

> xPath(XML Path Language)는 XML 문서의 특정 요소나 속성을 찾기 위한 쿼리 언어로, HTML 문서에서도 사용할 수 있습니다.

<img src="https://github.com/user-attachments/assets/351dd9b5-b8b4-402f-83c1-3719bdcf10e3" width="600"/>

<br>

### 2-2. 다중 해상도 뷰에서 비동기적 스크롤 동기화를 어떻게 구현할까?

멀티뷰 모드에서 여러 해상도의 웹페이지를 동시에 표시할 때, 뷰 간 스크롤 동기화에 문제가 발생했습니다. 주요 이슈는 다음과 같았습니다

- 특정 해상도에서만 스크롤이 동기화되는 현상
- 일부 뷰에서 동기화 이벤트가 발생하지 않는 문제
- 콘솔 로그는 정상 출력되지만 실제 동기화가 이루어지지 않는 상황

문제의 근본 원인은 뷰 생성 및 초기화 과정의 비동기적 특성에 있었습니다. 초기 구현에서는 Promise.all을 사용하여 모든 뷰를 동시에 생성하고 초기화했습니다:

```js
const viewPromises = viewConfigs.map(async (config, index) => {
  // 비동기 뷰 생성 및 초기화 로직
});
await Promise.all(viewPromises);
```

이 방식은 성능 면에서는 효율적일 수 있지만, 각 뷰의 생성과 초기화 순서가 보장되지 않아 동기화 상태의 일관성 문제를 야기했습니다.

이 문제를 해결하기 위해, 순차적인 뷰 생성 및 초기화 방식을 도입했습니다.

```js
for (let index = 0; index < viewConfigs.length; index++) {
  const config = viewConfigs[index];

  await createAndInitializeView(config, index, url);
}
```

이 접근 방식의 주요 이점은 다음과 같습니다.

- 뷰 생성 순서 보장: 각 뷰가 순차적으로 생성되어 초기화 순서가 명확해집니다.
- 상태 일관성 향상: 이전 뷰의 초기화가 완료된 후 다음 뷰가 생성되므로, 동기화 상태의 일관성이 개선됩니다.
- 에러 처리 용이성: 각 뷰의 생성 및 초기화 과정에서 발생하는 문제를 개별적으로 처리할 수 있습니다.

이러한 변경으로 스크롤 동기화의 안정성이 향상되었습니다.

추가적으로, 스크롤 이벤트 처리와 뷰 간 통신을 최적화하기 위해 다음과 같은 기술을 적용했습니다.

- 디바운싱: 과도한 스크롤 이벤트 발생을 방지하기 위해 스크롤 이벤트에 디바운스 기법을 적용했습니다.
- 정규화된 스크롤 위치: 각 뷰의 크기 차이를 고려하여 스크롤 위치를 정규화된 값(0~1 사이)으로 전달했습니다.

이러한 최적화 기법들을 통해 다중 해상도 환경에서의 스크롤 동기화 문제를 효과적으로 해결할 수 있었습니다. 결과적으로 사용자는 어떤 해상도의 뷰를 조작하더라도 모든 뷰에서 일관된 스크롤 경험을 얻을 수 있게 되었습니다.

<br>

## 3. 선택한 요소의 수정한 속성을 기억할 순 없을까?

프로젝트를 개발하면서 웹 페이지 요소의 스타일을 수정하는 기본 기능은 잘 작동했지만, 뭔가 부족하다는 느낌이 들었습니다. 직접 테스트를 해보니, 여러 요소를 수정하다 보면 어떤 부분을 변경했는지 헷갈리기 시작했습니다. 이는 사용자도 비슷한 어려움을 겪을 수 있다는 것을 의미했습니다.
이 문제를 해결하기 위해 두 가지 핵심 사항에 집중했습니다.

- 수정한 요소와 속성을 눈에 띄게 표시하기
- 변경 사항을 한눈에 볼 수 있게 만들기

이를 위해 수정 내역을 추적하고 UI에 반영하는 기능을 추가하기로 했습니다. 이렇게 하면 다음과 같은 장점이 있을 거라고 생각했습니다.

- 사용자가 수정한 내용을 바로 확인할 수 있음
- 어떤 요소와 속성을 변경했는지 명확히 알 수 있어 혼란을 줄일 수 있음

처음에는 이 기능을 생각하지 못했지만, 개발하면서 사용자 입장에서 생각해보니 꼭 필요한 기능이라고 판단했습니다. 사용자가 편리하게 사용할 수 있는 툴을 만드는 것이 중요하다고 생각했기 때문에 계획에 없었지만 이 기능을 추가하기로 결정했습니다.

<div align="center">
  <table>
    <tr>
      <td align="center"><img width="300" src="https://github.com/user-attachments/assets/839bb4b0-6763-4ee2-9bfb-0b495f5e8742" alt="요소 수정 전"></td>
      <td align="center"><img width="300" src="https://github.com/user-attachments/assets/c1522207-e0c5-49df-8ed6-1d31ca82216c" alt="요소 수정 후"></td>
    </tr>
    <tr>
      <td align="center">요소 수정 전</td>
      <td align="center">요소 수정 후</td>
    </tr>
  </table>
</div>

<br>

이 기능을 추가한 후, 제가 직접 사용해보니 작업 흐름이 훨씬 더 명확해졌습니다. 어떤 부분을 수정했는지 바로 알 수 있어서 작업 속도도 빨라졌고, 실수로 같은 부분을 여러 번 수정하는 일도 줄었습니다. 이런 경험을 통해 사용자의 관점에서 생각하고 기능을 개선하는 것의 중요성을 깨달았습니다.

### 구현 상의 고려사항

수정 내역을 추적하는 과정에서 몇 가지 중요한 디자인 결정을 내려야 했습니다. 가장 큰 고민은 HTML 구조의 계층성을 어떻게 다룰 것인가였습니다.
예를 들어, 다음과 같은 HTML 구조가 있다고 가정하겠습니다.

```html
<p>안녕하세요, <b>프론트엔드 개발자 <i>로지</i></b>입니다. </p>
```

이 경우, 사용자가 `<p>` 태그의 스타일을 수정했을 때, `<b>` 태그나 `<i>` 태그를 클릭했을 때도 수정 내역이 표시되어야 할까요? 이는 사용자 경험 측면에서 장단점이 있었습니다.

- 장점: 상위 요소의 수정 사항이 하위 요소에도 영향을 미친다는 것을 직관적으로 보여줄 수 있습니다.
- 단점: 사용자가 정확히 어떤 태그를 수정했는지 헷갈릴 수 있습니다.

결국 저는 정확성을 위해 수정된 요소만 정확히 표시하기로 결정했습니다. 이는 [2-1. UUID 대신 xPath를 사용해 요소를 어떻게 식별할까?](#2-1-uuid-대신-xpath를-사용해-요소를-어떻게-식별할까)에서 설명한 XPath를 사용하여 요소를 정확히 식별하는 방식으로 구현되었습니다.

그러나 이러한 접근 방식도 100% 완벽하다고 할 수는 없는데요. 사용자가 `<p>`태그의 글자 색을 변경했을 때, 그 안의 `<b>`태그의 텍스트 색상도 변경되는데, 수정 내역에서는 명시적으로 보이지 않게 되는 점입니다. 이는 CSS의 상속 특성 때문인데요. 이러한 한계를 인지하고 있지만. 단순성과 명확성을 위해 지금의 접근 방식을 유지하기로 하였습니다. 대신, 향후 사용자 가이드를 통해 사용자는 자신의 변경 사항이 어떤 영향을 미치는지 알 수 있게 하려고 합니다.

<br>

# Project Insights

웹 개발 경험은 있었지만 Electron을 사용한 데스크톱 앱 개발은 새로운 도전이었습니다. IPC 통신 구현 과정에서 웹과 데스크톱 앱 개발의 차이를 실감했고, 이를 극복하며 새로운 기술을 습득하는 즐거움을 느꼈습니다.

이 프로젝트를 통해 사용자 중심 설계의 중요성을 깊이 깨달았습니다. 초기에는 기능 구현에만 집중했지만, 개발 과정에서 사용자 경험을 최우선으로 고려하는 방향으로 전환했습니다. 개인 프로젝트였기에 모든 결정을 혼자 내려야 했지만, 외부 피드백의 중요성 또한 크게 느꼈습니다. 주기적으로 다른 분들에게 사용성에 대한 의견을 구하고, 직접 사용자 입장에서 테스트하며 불편한 점들을 개선해 나갔습니다.

이 과정에서 개발자의 시각과 사용자의 시각 사이의 간극을 좁힐 수 있었고, 결과적으로 더 나은 사용자 경험을 제공할 수 있었습니다. 예를 들어, 수정 내역 추적 기능은 직접 사용하면서 그 필요성을 깨닫고 추가한 것인데, 이는 프로젝트의 유용성을 높이는 결과를 가져왔습니다.

이러한 경험을 통해 사용자 경험 향상이 프로젝트의 완성도와 가치를 결정짓는 핵심 요소임을 깨달았습니다. 또한, 프로젝트 완료 후에도 지속적인 개선과 학습의 필요성을 인식하게 되었습니다.

앞으로도 이번 경험을 바탕으로, 기술적 역량과 사용자 중심 사고를 균형 있게 발전시켜 더 나은 결과물을 만들어내기 위해 지속적으로 노력하고 발전해 나갈 것입니다.
