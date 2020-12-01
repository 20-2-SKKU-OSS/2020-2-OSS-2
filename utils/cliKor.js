const meow = require('meow');
const { green, yellow, cyan } = require('chalk');

module.exports = meow(
	`
	Usage
	  ${green(`corona`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}
	Commands
	  ${cyan(`country-name`)}  해당국가의 데이터 가져오기
	  ${cyan(`states`)}        미국주들의 데이터 가져오기
	Options
	  ${yellow(`-s`)}, ${yellow(`--sort`)}      데이터타입으로 정렬
	  ${yellow(`-r`)}, ${yellow(`--reverse`)}   역순으로 출력
	  ${yellow(`-l`)}, ${yellow(`--limit`)}     N개 항목만 출력
	  ${yellow(`-b`)}, ${yellow(`--bar`)}       막대차트에서 통계 출력
	  ${yellow(`-c`)}, ${yellow(`--chart`)}     국가별 통계 출력
	  ${yellow(`-g`)}, ${yellow(`--log`)}       로그차트 출력
	  ${yellow(`-x`)}, ${yellow(`--xcolor`)}    단일 색상 출력
	  ${yellow(`-m`)}, ${yellow(`--minimal`)}   최소 CLI 출력
	  ${yellow(`-j`)}, ${yellow(`--json`)}      Jason으로 출력
	  ${yellow(`--continent`)}     대륙별 통계 출력
	  ${yellow(`--danger`)}        CDC 보건고지 레벨에 따른 위험국가 출력
	  ${yellow(`--csv`)}           CSV 파일 내보내기
	  ${yellow(`--news`)}          코로나 뉴스 인쇄
	Examples
	  ${green(`corona`)} ${cyan(`china`)}		${cyan(`중국`)} 데이터 출력
	  ${green(`corona`)} ${cyan(`states`)}		${cyan(`미국주들`)}의 데이터 출력
	  ${green(`corona`)} ${yellow(`--bar`)}		${yellow(`막대차트`)}로 통계 출력
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)}	${cyan(`중국`)} 데이터를 ${yellow(`차트`)}로 출력
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)} ${yellow(`--log`)}	${cyan(`중국`)} 데이터를 ${yellow(`로그차트`)}로 출력
	  ${green(`corona`)} ${yellow(`--csv`)} ${cyan(`states`)}         ${cyan(`미국주들`)}의 데이터를 ${yellow(`csv`)}로 추출
	  ${green(`corona`)} ${yellow(`--sort`)} ${cyan(`cases-today`)}	${cyan(`당일 발생`)}으로 ${yellow(`정렬`)}해서 출력
	  ${green(`corona`)} ${yellow(`-s`)} ${yellow(`-l4`)} ${cyan(`critical`)}	${cyan(`중증환자`)}로 ${yellow(`정렬`)}해서 ${yellow(`네개의`)} 데이터를 출력
	Sort Key
	  ${yellow(`Country`)}: 국가명
	  ${yellow(`Cases`)}: 총확진자
	  ${yellow(`Cases (today)`)}: 24시간 내에 발생한 환자
	  ${yellow(`Deaths`)}: 총 사망자
	  ${yellow(`Deaths (today)`)}: 24시간 내에 발생한 확진자
	  ${yellow(`Recovered`)}: 총완치자
	  ${yellow(`Active`)}: 실질확진자
	  ${yellow(`Critical`)}: 총중증환자
	  ${yellow(`Per Million`)}: 인구 100만명당 확진자
	❯ 명령 + 옵션도 한 번에 수행할 수 있다:
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`-x`)} ${yellow(`-s cases`)}
`,
	{
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			xcolor: {
				type: 'boolean',
				default: false,
				alias: 'x'
			},
			sort: {
				type: 'string',
				default: 'cases',
				alias: 's'
			},
			reverse: {
				type: 'boolean',
				default: false,
				alias: 'r'
			},
			limit: {
				type: 'number',
				default: Number.MAX_SAFE_INTEGER,
				alias: 'l'
			},
			chart: {
				type: 'boolean',
				default: false,
				alias: 'c'
			},
			log: {
				type: 'boolean',
				default: false,
				alias: 'g'
			},
			bar: {
				type: 'boolean',
				default: false,
				alias: 'b'
			},
			minimal: {
				type: 'boolean',
				default: false,
				alias: 'm'
			},
			json: {
				type: 'boolean',
				default: false,
				alias: 'j'
			},
			continent: {
				type: 'boolean',
				default: false
				// alias: 'b'
			},
			danger: {
				type: 'boolean',
				default: false
			},
			csv: {
				type: 'boolean',
				default: false,
			},
			news: {
				type: 'boolean',
				default: false,
			}
		}
	}
);
