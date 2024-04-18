# OpenLayers

웹 상에서 지도를 표시하기 위해 사용되는 오픈 소스 자바스크립트 라이브러리
다양한 종류의 지도 데이터 소스를 활용하여, 지도 기반 애플리케이션 개발 가능

## 주요 특징

1. 다양한 데이터 소스 지원: 다양한 종류의 지도 데이터 소스를 지원하며, 표준 포멧이 포함됨.
2. 풀부한 기능: 사용자는 지도에 다양한 기능 추가 가능, 예를 들어 줌인/줌아웃, 패닝, 마커 추가 등등
3. 사용자 정의 가능: CSS를 이용하여 지도의 스타일을 바꾸거나 JavaScript API를 통해 동작 제어 가능

## 주요 구성 요소: map, view, source, layer 그리고 이것들의 결합

### 지도 (Map)

단순히 지도가 표시될 기본 틀이며, 지도의 모든 요소가 이 공간 안에 들어가게 됩니다.
지도는 웹 페이지에 표시되는 것으로, 특정 HTML 요소(예: <div>) 안에 그려집니다.
먼저 HTML을 준비합니다. <div id="map" style="width: 100%; height: 400px"></div> 이 HTML 코드는 지도가 표시될 공간을 정의합니다.
다음은 JavaScript로 map객체를 생성합니다. const map = new Map({target: 'map'}); 이 JavaScript 코드는 위에서 만든 <div> 안에 지도를 생성합니다.
> 참고로 import Map from 'ol/Map.js'로 임포트 해줘야 합니다. 위처럼하면 div의 id에 적힌 것과 target에 동일명이라면 생성한 맵 객체가 div 안에 표시됩니다.

### 뷰 (View)

뷰는 맵 내에서 사용자가 보는 지도의 '시점'을 결정합니다.여기에는 지도의 중심 위치, 줌 레벨(확대 수준), 그리고 지도의 좌표 시스템(프로젝션) 설정이 포함됩니다.
View 객체 생성과 주로 설정하는 옵션의 대한 설명은 아래와 같습니다.
import View from 'ol/View.js';
const view = new View({
    center: [0, 0]                 // 지도의 중싱이 될 좌표, [0, 0]은 경도가 0 그리고 위도가 0인 지점
    zoom: 2                        // 숫자가 클수록 더 많이 확대된 상태
    projection: 'EPSG:3857'        // 지도의 좌표계, 좌표계 설정은 사용 목적에 따라 그에 최적화된 좌표계를 선택하여 결정됨( 전세계 or 지역적&국가적단위 or 구글맵&네이버지도 등 )
})
이제 map에 view를 적용시킵니다. setView() 메서드를 적용함으로서
map.setView(view)

### 소스 (Source)

소스는 지도에 데이터를 어떻게 그리고 어디서 가져올지 정의합니다. 이 데이터를 로드하는 방법을 소스에서 정의합니다.
몇 가지 주요 예시로, 타일 소스는 지도를 여러 개의 작은 타일로 나누어 로드합니다.
이미지 소스는 지도의 특정 영역을 하나의 큰 이미지로 로드하는 등
굉장히 다양한 소스들이 존재하며, 소스의 타입과 설정에 따라 지도의 로딩속도, 표현 방식, 상호작용성이 결정됩니다.

// XYZ 소스 사용 예
import XYZ from 'ol/source/XYZ.js';
const xyzSource = new XYZ({
  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
});

// GeoJSON 벡터 소스 사용 예
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorSource from 'ol/source/Vector.js';     // 벡터 소스의 사용
const geoJsonSource = new VectorSource({
  url: 'data/mydata.geojson',
  format: new GeoJSON()                             // GeoJSON에 벡터 소스 적용
});

위처럼 적절히 자신에게 필요한 지도 데이터를 사용가능

### 레이어 (Layer)

레이어는 지도 위에 데이터를 시각적으로 표현하는 층으로, 소스에서 제공하는 데이터를 어떻게 표시할 지를 결정하는 구성요소
각 레이어는 특정 종류 데이털르 표시하기에 최적화 되어 있으며, 하나의 지도 위에 여러 개의 레이어 겹침이 가능합니다.
레이어의 효과적인 사용이 지도 애플리케이션의 품질을 크게 좌우함.(지도의 사용성과 가독성 개선 가능 등)

const layer = new TileLayer({source: source}); 이 코드는 OpenStreetMap의 데이터 소스를 사용하여 타일 레이어를 생성합니다.
map.addLayer(layer); 이 코드는 위에서 만든 레이어를 지도에 추가합니다.

아래는 사용 예시입니다.

import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';

const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: 'data/mydata.geojson',
    format: new GeoJSON()
  })
});

### 모든 것을 결합

앞서 설명한 OpenLayers의 개념들—맵(Map), 뷰(View), 소스(Source), 그리고 레이어(Layer)—를 하나의 완성된 스크립트로 통합하여 실제로 지도를 웹 페이지에 어떻게 렌더링되는 지 볼 수 있습니다.
아래는 완성된 스크립트의 예시입니다.

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';

const map = new Map({           // 3. 맵 객체 생성 및 설정, Map 객체를 생성하며 layer와 view도 설정하고, 이 맵이 표시될 HTML요소의 ID도 target에 지정합니다.
  layers: [                     // 1. 레이어 생성, TileLayer와 OSM 소스를 사용해 레이어를 생성합니다. 이 레이어는 OpenStreetMap의 데이터를 사용하여 지도 타일 표시합니다.
    new TileLayer({
      source: new OSM()
    }),
  ],
  view: new View({              // 2. view 객체를 생성, 지도의 초기 중심 위치와 줌 레벨을 설정합니다.
    center: [0, 0],
    zoom: 2
  }),
  target: 'map'
});

이렇게 각 구성요소가 어떻게 연결되는지 파악할 수 있습니다.
마지막으로 일반화하여 정리하자면
layer는 데이터를 제공하고 로드 방식을 지정합니다.
view는 사용자가 그 데이터를 어떻게 보게 될 지를 정의하며
map 객체는 최종적으로 이 모든 정보를 담아 사용자 브라우저에 지도를 표시합니다.

## 현재 OPENLAYER-TUTORIAL 코드 해설

아래의 파일들은 핵심이 되는 파일들이다.
전체적인 요약은 다음과 같다.
사용자는 웹 상에서 리스트로 보여지는 지도 종류들 중에서 하나를 선택하면, 해당 종류의 지도가 웹 브라우저에 렌더링된다.

### AppHeader.vue

페이지의 제목이 나타나있고, 스타일시트가 지정되어있다.
애플리케이션 상단의 헤더 부분 구현, 메뉴 옵션 리스트를 나타냄( 아래 menu의 있는 item들을 v-for 디렉티브를 이용해 리스트로 나열함 )

### router\menu.js

앞서 AppHeader에서 나열하는 menu 리스트가 되는 파일이고, 여기에 표시할 지도 종류들을 링크와 함께 나열한다.
그리고 컴포넌트로 해당 Map을 렌더링하는 파일로 넘어간다.

### views\MapRender.vue

실제로 Map 렌더링을 담당하는 부분이다.
mapConfig(맵속성)처리한 함수로 받아 결과물로 CustomMap 객체를 생성하고 이를 mounted하여 div에 렌더링한다.

### utils\mapConfig.js

본질이 되는 맵의 속성들을 정의하고 구성하는 파일이다.
맵객체 생성, view 정의, layer 정의, source 정의 등을 여기서 거친다음 함수를 MapRender에 넘겨준다.
사용자에게 보여지는 지도를 변경하고자 한다면 해당 파일을 편집함으로서 그리 할 수 있다.
