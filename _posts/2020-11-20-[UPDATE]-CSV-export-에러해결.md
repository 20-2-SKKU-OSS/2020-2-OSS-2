---
layout: post
title: "[UPDATE] CSV export 에러해결"
tags: [corona-cli, Archive, UPDATE]
excerpt_separator: <!--more-->
author: JEONYUNTAE
feature-img: 
---

미국 states별 코로나 감염자 관련 정보를 csv파일로 추출하는 기능에 에러가 있었습니다. 

<!--more-->

![jyt_01.png](/2020-2-OSS-2/assets/img/jyt_01.png)

저희가 참여한 프로젝트의 이슈 중 csv파일을 export하는데 있어 ouput디렉토리가 존재하지 않으면 에러가 발생했습니다.

![jyt_02.png](/2020-2-OSS-2/assets/img/jyt_02.png)

그래서 다음과 같이 해당 디렉토리가 있는지 확인하고 없으면 생성해주는 디렉토리 체킹 과정을 만들어 해당 issue에 피드백하였고,
저희 레포지토리에 반영하여 추후에 pull-request를 요청할 예정입니다.
