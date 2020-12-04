---
layout: post
title: "[UPDATE] CSV export 옵션추가"
tags: [corona-cli, Archive, UPDATE]
excerpt_separator: <!--more-->
author: jyt
feature-img: 
---

국가별 코로나 감염자 관련 정보를 csv파일로 추출하는 --csv 옵션을 만들어 추가하였습니다.

<!--more-->

![jyt_13.png](/2020-2-OSS-2/assets/img/jyt_13.png)

## From : issue [#98](https://github.com/ahmadawais/corona-cli/pull/98)

다음 내용에 따르면 어떤 개발자가 csv-export 기능을 추가하면 좋겠다라는 생각에
csv-export 기능을 추가하였지만 실제로 코드를 보면 옵션을 주어 선택하는 것이 아닌
원하든 원하지 않든 무조건 csv-export가 실행되도록 만들어 두었습니다.

![jyt_14.png](/2020-2-OSS-2/assets/img/jyt_14.png)

![jyt_15.png](/2020-2-OSS-2/assets/img/jyt_15.png)

그래서 이 문제를 저희 프로젝트 이슈란에 등록하고 문제를 해결해 보았습니다.

![jyt_05.png](/2020-2-OSS-2/assets/img/jyt_05.png)

![jyt_16.png](/2020-2-OSS-2/assets/img/jyt_16.png)

그리고 개선된 코드를 저희의 프로젝트에, 풀리퀘스트 요청을 하고

![jyt_07.png](/2020-2-OSS-2/assets/img/jyt_07.png)

코드리뷰 과정을 거친 후 정상적으로 풀리퀘스트를 마쳤습니다.

## Link : Pull-request [#29](https://github.com/20-2-SKKU-OSS/2020-2-OSS-2/pull/29)
