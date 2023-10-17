const fs = require('fs');

function ordenarPorMelhorPrecoPorMinuto(dadosStr) {
  // Dividir a string em linhas
  const linhas = dadosStr.split('\n');

  // Inicializar uma matriz para armazenar os dados formatados
  const dados = [];

  // Processar cada linha da string
  linhas.forEach(function (linha) {
    const partes = linha.split('\t');
    if (partes.length === 4) {
      const id = parseInt(partes[0]);
      const precoStr = partes[1];
      const tempoStr = partes[3];

      // Extrair o preço e o tempo como números
      const preco = parseFloat(precoStr.replace('$', '').trim());
      const tempo = parseFloat(tempoStr.trim());

      // Calcular o preço por minuto
      const valorPorMinuto = preco / tempo;

      // Adicionar os dados formatados à matriz com o ID
      dados.push([id, preco, tempo, valorPorMinuto]);
    }
  });

  // Ordenar os dados com base no valor por minuto em ordem crescente
  dados.sort(function (a, b) {
    return a[3].toString().localeCompare(b[3].toString());
  });
  

  // Gere o HTML com os dados ordenados
  const html = gerarHTML(dados);

  // Salvar o HTML em um arquivo chamado "melhores.html"
  fs.writeFileSync('melhores.html', html);

  console.log('Arquivo "melhores.html" gerado com sucesso.');
}

function gerarHTML(dados) {
  // Crie uma string HTML com base nos dados ordenados
  let html = `
    <html>
      <head>
        <title>Dados Ordenados</title>
      </head>
      <body>
        <h1>Dados Ordenados por Melhor Preço por Minuto</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Preço</th>
            <th>Tempo</th>
            <th>Valor por Minuto</th>
          </tr>`;

  dados.forEach(function (entrada) {
    // Crie um link com o ID no lugar dos zeros na URL
    const link = `https://openloot.com/items/BT0/Hourglass_Common/issue/${entrada[0]}`;

    html += `
          <tr>
            <td><a href="${link}" target="_blank">${entrada[0]}</a></td>
            <td>${entrada[1]}</td>
            <td>${entrada[2]}</td>
            <td>${entrada[3]}</td>
          </tr>`;
  });

  html += `
        </table>
      </body>
    </html>`;

  return html;
}

const dadosStr = `
130267	$ 18	Link	0.62
282102	$ 62	Link	0.69
380585	$ 20	Link	0.91
386306	$ 15	Link	0.99
28784	$ 19.70	Link	1.96
138940	$ 22	Link	4.96
225400	$ 22	Link	4.96
20674	$ 30	Link	5.41
10760	$ 32	Link	5.97
288245	$ 12.59	Link	6.00
367942	$ 19.87	Link	6.96
103501	$ 15	Link	9.79
415528	$ 11	Link	10
591741	$ 11	Link	10
136614	$ 12.80	Link	10
519637	$ 13	Link	10
13815	$ 14.58	Link	10
461501	$ 15	Link	10
342554	$ 16	Link	10
153365	$ 20	Link	10
455613	$ 20	Link	10
231190	$ 25	Link	10
312877	$ 30	Link	10
444306	$ 53	Link	10
449625	$ 53	Link	10
269144	$ 66	Link	10
82416	$ 11.80	Link	12.89
168838	$ 20	Link	12.98
589972	$ 14	Link	14.00
191975	$ 23	Link	14.97
244368	$ 65	Link	15.98
491112	$ 21.30	Link	16.98
570142	$ 25	Link	18.08
280271	$ 24	Link	18.94
245261	$ 53	Link	20
495377	$ 15	Link	23.83
78934	$ 15	Link	27.00
461333	$ 30	Link	29.77
73033	$ 14.80	Link	30
23920	$ 16	Link	30
246518	$ 17	Link	30
239821	$ 19.90	Link	30
187686	$ 20	Link	30
305173	$ 21	Link	30
296007	$ 45	Link	30
82614	$ 13.90	Link	31.15
274623	$ 19	Link	32.31
584132	$ 25	Link	40
131314	$ 40	Link	40
323010	$ 45	Link	40
556602	$ 35	Link	42.98
460214	$ 40	Link	42.98
167063	$ 53	Link	45.00
177858	$ 24	Link	47.99
104643	$ 13	Link	53.04
510628	$ 20	Link	58.99
176052	$ 20	Link	58.99
345268	$ 20	Link	59.98
456262	$ 11	Link	60
396319	$ 13	Link	60
376504	$ 15	Link	60
255854	$ 16.50	Link	60
372978	$ 18	Link	60
512283	$ 19.88	Link	60
318625	$ 20	Link	60
3043	$ 20	Link	60
20146	$ 20	Link	60
1527	$ 21.49	Link	60
548451	$ 21.49	Link	60
457839	$ 23	Link	60
179477	$ 40	Link	60
398137	$ 40	Link	60
410305	$ 45	Link	60
440878	$ 45	Link	60
11727	$ 49	Link	60
355880	$ 53	Link	60
243985	$ 60	Link	60
250560	$ 80	Link	60
298284	$ 16.99	Link	63.85
476200	$ 16.50	Link	65.74
522949	$ 20	Link	68.98
194137	$ 19.99	Link	69.98
215899	$ 19.99	Link	69.98
82675	$ 19.99	Link	71.98
377843	$ 15	Link	73.70
554020	$ 16.99	Link	73.85
346571	$ 19.99	Link	73.99
167894	$ 16.99	Link	74.85
165588	$ 15	Link	81.49
93696	$ 30	Link	82.00
299890	$ 15	Link	82.98
167722	$ 15	Link	82.98
536718	$ 16.35	Link	84.99
591550	$ 16.35	Link	84.99
119155	$ 35	Link	85.88
174590	$ 17.80	Link	90
109164	$ 20	Link	90
484016	$ 22	Link	90
267857	$ 33	Link	92.82
440050	$ 36	Link	95.12
580301	$ 58	Link	95.86
579172	$ 18	Link	96.99
536613	$ 20	Link	96.99
155420	$ 36	Link	97.89
425081	$ 70	Link	102.00
446369	$ 16.50	Link	105.42
452631	$ 20	Link	107.69
371648	$ 40	Link	109.00
21555	$ 18.89	Link	110.81
510879	$ 19	Link	111.00
133519	$ 20	Link	111.51
279887	$ 20	Link	112.00
507663	$ 20	Link	112.00
349570	$ 20	Link	115.51
513566	$ 15	Link	120
526540	$ 17	Link	120
64451	$ 17	Link	120
156355	$ 17.90	Link	120
510362	$ 18	Link	120
583565	$ 18	Link	120
373566	$ 18	Link	120
81435	$ 18	Link	120
525201	$ 18.99	Link	120
385722	$ 18.99	Link	120
597909	$ 19	Link	120
78351	$ 19	Link	120
108107	$ 19	Link	120
408988	$ 19	Link	120
164145	$ 19	Link	120
206762	$ 19.55	Link	120
451055	$ 19.55	Link	120
110587	$ 19.55	Link	120
382621	$ 19.55	Link	120
251192	$ 19.55	Link	120
8634	$ 19.55	Link	120
424290	$ 19.70	Link	120
398462	$ 19.90	Link	120
396977	$ 19.90	Link	120
538866	$ 19.90	Link	120
118222	$ 20	Link	120
70252	$ 20	Link	120
534971	$ 21	Link	120
132555	$ 21	Link	120
579762	$ 21	Link	120
410953	$ 21	Link	120
427031	$ 21	Link	120
541704	$ 21	Link	120
73639	$ 21	Link	120
322809	$ 22.95	Link	120
427725	$ 22.95	Link	120
88298	$ 24.50	Link	120
171559	$ 24.50	Link	120
140566	$ 24.50	Link	120
505431	$ 24.90	Link	120
351825	$ 25	Link	120
501652	$ 25	Link	120
76317	$ 25	Link	120
537235	$ 25	Link	120
452732	$ 26	Link	120
561773	$ 27.50	Link	120
363666	$ 28	Link	120
449207	$ 28	Link	120
362493	$ 28	Link	120
92344	$ 30	Link	120
87946	$ 30	Link	120
173143	$ 30	Link	120
101521	$ 30	Link	120
131630	$ 30	Link	120
507544	$ 30	Link	120
172910	$ 30	Link	120
76116	$ 32	Link	120
569927	$ 33	Link	120
192967	$ 33	Link	120
343594	$ 33	Link	120
30615	$ 36.41	Link	120
69896	$ 36.99	Link	120
414356	$ 40	Link	120
590636	$ 40	Link	120
296307	$ 42	Link	120
115052	$ 50	Link	120
17835	$ 55.12	Link	120
35576	$ 55.34	Link	120
14913	$ 102	Link	120
518535	$ 108	Link	120
440129	$ 25	Link	120.99
512938	$ 19	Link	121.58
238319	$ 40	Link	123.89
198485	$ 32	Link	124.03
27482	$ 23	Link	125.89
67989	$ 19	Link	127.61
26960	$ 22	Link	129.00
26960	$ 22	Link	129.00
217865	$ 24.99	Link	130
327208	$ 25	Link	130
552083	$ 48	Link	130
187163	$ 19	Link	133.82
176091	$ 23	Link	142.00
407868	$ 23	Link	147.51
426087	$ 16	Link	150
322936	$ 24.50	Link	150
64535	$ 24.50	Link	150
152119	$ 35	Link	150
423278	$ 42.11	Link	150
77	$ 77	Link	150
489010	$ 100	Link	150
352119	$ 25	Link	158.27
195672	$ 27	Link	160.49
166334	$ 30	Link	160.49
194951	$ 24	Link	162.49
136512	$ 23	Link	167.49
50783	$ 21	Link	176.67
121055	$ 20	Link	180
222051	$ 36.99	Link	180
547997	$ 20	Link	183.42
271932	$ 22.80	Link	197.99
185496	$ 22.80	Link	197.99
316763	$ 250	Link	208.12
506244	$ 27	Link	208.28
61792	$ 24	Link	209.28
237865	$ 24	Link	209.28
361985	$ 26	Link	209.28
435223	$ 19.99	Link	210
382406	$ 35	Link	210
235336	$ 36.99	Link	210
544599	$ 40	Link	212.29
515373	$ 45	Link	226.00
352369	$ 27	Link	227.95
527439	$ 99	Link	237.00
224377	$ 55	Link	239.66
423029	$ 25	Link	240
549870	$ 25.45	Link	240
381873	$ 25.50	Link	240
66720	$ 25.99	Link	240
564037	$ 26	Link	240
143017	$ 60	Link	240
323134	$ 22	Link	246.36
251850	$ 34	Link	246.84
191295	$ 25	Link	268.90
594713	$ 27	Link	269.27
277292	$ 21	Link	270
144911	$ 27	Link	270.27
516121	$ 27	Link	271.27
251282	$ 27	Link	271.27
20824	$ 26.80	Link	300
16838	$ 45	Link	300
187989	$ 40	Link	303.09
543872	$ 34	Link	305.09
70703	$ 49.90	Link	307.92
306607	$ 34	Link	315.30
66344	$ 33	Link	317.88
499831	$ 38	Link	329.90
97021	$ 30	Link	330
443164	$ 36	Link	331.88
120269	$ 34	Link	347.92
427365	$ 37	Link	347.92
208573	$ 38	Link	352.87
488127	$ 25	Link	359.88
66430	$ 25	Link	362.88
441379	$ 30	Link	363.50
72066	$ 40	Link	366.58
313949	$ 47	Link	367.41
454726	$ 35	Link	368.92
454285	$ 32	Link	370.27
411267	$ 34.50	Link	376.91
144571	$ 34.80	Link	376.91
463276	$ 35	Link	376.91
109793	$ 36	Link	378.91
493218	$ 30	Link	382.39
453826	$ 35	Link	384.46
525167	$ 34	Link	385.91
411225	$ 36	Link	388.95
407805	$ 80	Link	389.24
398107	$ 33	Link	389.95
594225	$ 34	Link	389.95
412391	$ 48	Link	390
857	$ 35	Link	391.95
108707	$ 80	Link	392.17
4728	$ 39	Link	402.82
232804	$ 38	Link	404.33
248643	$ 37	Link	404.82
381853	$ 60	Link	420
546593	$ 32	Link	424.69
216319	$ 40	Link	424.69
339244	$ 39	Link	425.69
344663	$ 38	Link	426.69
516413	$ 30	Link	426.76
181702	$ 72	Link	434.36
419283	$ 100	Link	471.09
573580	$ 32	Link	471.44
148803	$ 42	Link	475.00
481349	$ 150	Link	485.39
106294	$ 33	Link	488.71
48940	$ 40	Link	489.49
300438	$ 37	Link	507.85
182394	$ 32	Link	508.85
556982	$ 36	Link	508.85
281561	$ 37	Link	508.85
347882	$ 37	Link	508.95
226739	$ 80	Link	517.63
136758	$ 80	Link	517.63
594199	$ 100	Link	524.06
158884	$ 37.80	Link	524.82
377921	$ 38	Link	527.82
12209	$ 100	Link	540.06
521528	$ 80	Link	542.24
110407	$ 31	Link	568.81
51117	$ 36.50	Link	568.81
547750	$ 40	Link	568.93
594886	$ 30	Link	569.61
488907	$ 40	Link	569.81
296387	$ 53	Link	573.20
217989	$ 34	Link	578.44
110954	$ 54	Link	580.95
66195	$ 55	Link	581.95
57023	$ 58	Link	588.96
76479	$ 32	Link	592.12
287546	$ 40	Link	592.68
287559	$ 40	Link	598.81
547714	$ 37.80	Link	598.98
205786	$ 39	Link	599.98
391663	$ 40	Link	599.98
590828	$ 38	Link	600.98
444268	$ 39	Link	603.97
542875	$ 40	Link	603.97
342465	$ 37	Link	604.97
390496	$ 38	Link	604.97
389177	$ 39	Link	604.97
429543	$ 59	Link	617.97
592989	$ 33	Link	618.17
339459	$ 39	Link	620.80
581458	$ 35	Link	622.71
166594	$ 38	Link	633.99
34416	$ 39	Link	637.98
547235	$ 55	Link	646.97
166255	$ 38	Link	660.99
98871	$ 50	Link	662.00
483548	$ 39	Link	675.58
191645	$ 49.80	Link	677.99
225513	$ 49.80	Link	677.99
192493	$ 69.99	Link	678.97
312829	$ 30.90	Link	698.89
63953	$ 30.90	Link	698.89
156574	$ 35	Link	702.73
417779	$ 35	Link	711.84
380652	$ 80	Link	713.54
419595	$ 28	Link	720
581460	$ 29	Link	720
357773	$ 29	Link	720
185259	$ 29	Link	720
101025	$ 29	Link	720
472787	$ 29	Link	720
239098	$ 29	Link	720
336002	$ 29	Link	720
181157	$ 29	Link	720
97759	$ 29	Link	720
221982	$ 30	Link	720
313347	$ 30	Link	720
220541	$ 30	Link	720
473512	$ 30	Link	720
378600	$ 30.90	Link	720
570638	$ 30.90	Link	720
371381	$ 30.90	Link	720
265706	$ 30.90	Link	720
248583	$ 32	Link	720
501112	$ 35	Link	720
289808	$ 39	Link	720
67486	$ 40	Link	720
354331	$ 40	Link	720
90060	$ 40	Link	720
304287	$ 40	Link	
16182	$ 41	Link	720
467176	$ 41.50	Link	720
233102	$ 41.50	Link	720
509303	$ 41.50	Link	720
366375	$ 41.50	Link	720
485853	$ 41.50	Link	720
52513	$ 41.50	Link	720
181267	$ 41.50	Link	720
225554	$ 41.50	Link	720
114749	$ 41.50	Link	720
565844	$ 41.50	Link	720
556116	$ 42	Link	720
316857	$ 42	Link	720
217124	$ 42	Link	720
451322	$ 42	Link	720
73480	$ 42	Link	720
401089	$ 44	Link	720
555807	$ 45	Link	720
263445	$ 45	Link	720
77695	$ 45	Link	720
54829	$ 45	Link	720
370357	$ 50	Link	720
281225	$ 50	Link	720
62531	$ 50	Link	720
530830	$ 50	Link	720
328128	$ 50	Link	720
462612	$ 50	Link	720
524448	$ 50	Link	720
538726	$ 50	Link	720
432938	$ 51	Link	720
442104	$ 51	Link	720
247037	$ 54.99	Link	720
255652	$ 55	Link	720
431537	$ 56	Link	720
60213	$ 59	Link	720
57761	$ 59.77	Link	720
214325	$ 60	Link	720
519892	$ 62	Link	720
93285	$ 63	Link	720
12098	$ 65	Link	720
329668	$ 65	Link	720
126931	$ 67	Link	720
475604	$ 67	Link	720
545063	$ 67.50	Link	720
76947	$ 67.50	Link	720
107890	$ 80	Link	720
411092	$ 100	Link	720
149718	$ 100	Link	720
120583	$ 100	Link	720
435868	$ 100	Link	720
429943	$ 100	Link	720
91885	$ 100	Link	720
3187	$ 130	Link	720
568510	$ 35	Link	727.84
487716	$ 44.77	Link	730
568203	$ 67	Link	730
44257	$ 100	Link	730
377553	$ 45	Link	747.7
538500	$ 50	Link	750
596697	$ 35	Link	752
253143	$ 69.90	Link	756.80
187962	$ 45	Link	779.98
276830	$ 38	Link	806.01
413378	$ 40	Link	832.42
65330	$ 39	Link	836.89
93503	$ 50	Link	847.70
286902	$ 59.80	Link	857.99
152727	$ 60	Link	870.00
395436	$ 50	Link	892.51
470708	$ 49	Link	894.60
564999	$ 39	Link	900
271038	$ 46	Link	900
351917	$ 70	Link	900
488833	$ 75	Link	900
27467	$ 75	Link	900
346941	$ 75	Link	900
254077	$ 100	Link	900
239073	$ 97.20	Link	909.99
516650	$ 50	Link	915.71
334518	$ 80	Link	920
264540	$ 45	Link	930
387133	$ 100	Link	945.72
60434	$ 60	Link	955.05
189218	$ 60	Link	959.97
88941	$ 68	Link	964.45
451951	$ 60	Link	964.91
39862	$ 74	Link	1020
83010	$ 100	Link	1020
573452	$ 45	Link	1063.76
349802	$ 60	Link	1078.60
409695	$ 60	Link	1079.60
134589	$ 55	Link	1080
56723	$ 108	Link	1080
569467	$ 52	Link	1080.32
62284	$ 71.90	Link	1122.82
526137	$ 130	Link	1127.05
184375	$ 100	Link	1172.61
286793	$ 50	Link	1174.96
143437	$ 50	Link	1175.55
165984	$ 40	Link	1210
550223	$ 50	Link	1219.97
558651	$ 60	Link	1237.45
179785	$ 50	Link	1250.75
560560	$ 80	Link	1251.52
123268	$ 82	Link	1297.77
182313	$ 110	Link	1320
150134	$ 70	Link	1330.10
91596	$ 70	Link	1331.24
255526	$ 100	Link	1336.61
181106	$ 100	Link	1338.61
326702	$ 68	Link	1341.25
346553	$ 83	Link	1381.28
324781	$ 48	Link	1417.73
232440	$ 58	Link	1436.00
115825	$ 68	Link	1439.56
238870	$ 60	Link	1440
485628	$ 70	Link	1440
175531	$ 70	Link	1440
569802	$ 70	Link	1440
291936	$ 95	Link	1443.31
260669	$ 64	Link	1444.37
181728	$ 48	Link	1463.55
281184	$ 89	Link	1463.61
368185	$ 48	Link	1471.55
446944	$ 65	Link	1485.50
319786	$ 45	Link	1506.56
347503	$ 66	Link	1516.45
136116	$ 48	Link	1535.56
27087	$ 68	Link	1549.69
402256	$ 67	Link	1613.53
392159	$ 72	Link	1620
422715	$ 72	Link	1621.23
255112	$ 50	Link	1636.65
308994	$ 50	Link	1735.60
419037	$ 55	Link	1754.19
62733	$ 80	Link	1771.61
87095	$ 80	Link	1774.09
571672	$ 73	Link	1800
537042	$ 60	Link	1821.51
114327	$ 47.50	Link	1873.17
422309	$ 46.50	Link	1876.96
485564	$ 60	Link	1900.25
402151	$ 90	Link	1924.61
88225	$ 80	Link	1957.32
432588	$ 100	Link	1958.53
570742	$ 48	Link	2006.43
486411	$ 48	Link	2018.43
431452	$ 110	Link	2029.51
26559	$ 110	Link	2031.51
84466	$ 110	Link	2031.51
506954	$ 110	Link	2040
493869	$ 110	Link	2108.50
506468	$ 80	Link	2142.77
355714	$ 47.90	Link	2189.09
579177	$ 47.90	Link	2189.09
498109	$ 55	Link	2231.26
493257	$ 85	Link	2233.41
528594	$ 100	Link	2243.57
547587	$ 111	Link	2257.06
74851	$ 100	Link	2267.27
25969	$ 60	Link	2280.42
473371	$ 100	Link	2280.58
412296	$ 55	Link	2284.11
162436	$ 55	Link	2326.13
209585	$ 88	Link	2337.74
209672	$ 88	Link	2340.74
518403	$ 88	Link	2341.74
180117	$ 60	Link	2366.79
360157	$ 70	Link	2391.70
304577	$ 105	Link	2412.84
221234	$ 1,000	Link	2463.40
580625	$ 1,000	Link	2463.40
7713	$ 85.50	Link	2511.41
12000	$ 85.50	Link	2549.54
466577	$ 50	Link	2577.63
468239	$ 50	Link	2579.63
34370	$ 120	Link	2611.61
158548	$ 1,000	Link	2634.65
384578	$ 1,000	Link	2636.40
103523	$ 108	Link	2656.56
457717	$ 125	Link	2700
120934	$ 62	Link	2713.96
381209	$ 61	Link	2714.96
153863	$ 63	Link	2714.96
163192	$ 63	Link	2718.92
520025	$ 59	Link	2774.73
349947	$ 59	Link	2774.73
347563	$ 59	Link	2774.73
162656	$ 59	Link	2774.73
578560	$ 137	Link	2803.98
332313	$ 137	Link	2803.98
513465	$ 130	Link	2822.99
346492	$ 49	Link	2880
261207	$ 49.60	Link	2880
550562	$ 49.75	Link	2880
516225	$ 49.80	Link	2880
467102	$ 49.80	Link	2880
368370	$ 50	Link	2880
320214	$ 50	Link	2880
222833	$ 59	Link	2880
369400	$ 59	Link	2880
41140	$ 60	Link	2880
468722	$ 68	Link	2880
105962	$ 68.78	Link	2880
321530	$ 68.78	Link	2880
347783	$ 68.78	Link	2880
321723	$ 68.78	Link	2880
511764	$ 68.88	Link	2880
358594	$ 68.89	Link	2880
459540	$ 68.97	Link	2880
186573	$ 68.97	Link	2880
251515	$ 69	Link	2880
298263	$ 69	Link	2880
573529	$ 69	Link	2880
16761	$ 69.93	Link	2880
571806	$ 71	Link	2880
230832	$ 73	Link	2880
553692	$ 75	Link	2880
110968	$ 76.50	Link	2880
459751	$ 77.99	Link	2880
198813	$ 77.99	Link	2880
185737	$ 77.99	Link	2880
297837	$ 78	Link	2880
532939	$ 78	Link	2880
292511	$ 79.74	Link	2880
360146	$ 79.74	Link	2880
30349	$ 83	Link	2880
520104	$ 85	Link	2880
24007	$ 89.86	Link	2880
164501	$ 89.86	Link	2880
326588	$ 93	Link	2880
54746	$ 93.50	Link	2880
223296	$ 94	Link	2880
136713	$ 94	Link	2880
292946	$ 94	Link	2880
70948	$ 94	Link	2880
504030	$ 94	Link	2880
164024	$ 94	Link	2880
400206	$ 94	Link	2880
562170	$ 94	Link	2880
504879	$ 95	Link	2880
403516	$ 99.63	Link	2880
501925	$ 99.63	Link	2880
242804	$ 103	Link	2880
475378	$ 105	Link	2880
577898	$ 109.87	Link	2880
566621	$ 109.87	Link	2880
421311	$ 110	Link	2880
591471	$ 113	Link	2880
7278	$ 115	Link	2880
499521	$ 115	Link	2880
516025	$ 119.87	Link	2880
257175	$ 119.87	Link	2880
512221	$ 119.87	Link	2880
265327	$ 140	Link	2880
315438	$ 150	Link	2880
244253	$ 150	Link	2880
45204	$ 150	Link	2880
417313	$ 2,000	Link	2880
468381	$ 110	Link	2910
21021	$ 119.88	Link	3046.61
309000	$ 99.90	Link	3169.40
394782	$ 58	Link	3600
269508	$ 58	Link	3600
227112	$ 73	Link	3600
155653	$ 77.40	Link	3600
384703	$ 77.70	Link	3600
479472	$ 78.50	Link	3600
345132	$ 78.80	Link	3600
488484	$ 79.96	Link	3600
429390	$ 82	Link	3600
221655	$ 83	Link	3600
311154	$ 83	Link	3600
550108	$ 83	Link	3600
428794	$ 83	Link	3600
44111	$ 83	Link	3600
396369	$ 84	Link	3600
376030	$ 84.20	Link	3600
19103	$ 88	Link	3600
274538	$ 135	Link	3600
559012	$ 149.55	Link	3600
182729	$ 89	Link	3900
114802	$ 1,000	Link	4253.40
272979	$ 148.88	Link	4281.81
27630	$ 85	Link	4320
415869	$ 91	Link	4320
412328	$ 91	Link	4320
408679	$ 99	Link	4320
12659	$ 139.74	Link	4320
447116	$ 139.90	Link	4320
410718	$ 145	Link	4320
404185	$ 174.55	Link	4320
75551	$ 170	Link	4375.00
157271	$ 145.50	Link	4378.45
139743	$ 111	Link	5040
340019	$ 200	Link	5487.70
451769	$ 200	Link	5491.70
78690	$ 125	Link	5528.88
306891	$ 168	Link	5534.57
580050	$ 131	Link	5760
542127	$ 165	Link	5760
59042	$ 198.55	Link	5760
494925	$ 250	Link	5760
526613	$ 250	Link	5760
404524	$ 250	Link	5760
322053	$ 250	Link	5760
307932	$ 250	Link	5760
312940	$ 250	Link	5760
214026	$ 250	Link	5760
536523	$ 250	Link	5760
443327	$ 250	Link	5760
79037	$ 250	Link	5760
247468	$ 165	Link	5851.33
215549	$ 169.95	Link	5942.34
262309	$ 180	Link	5982.01
578750	$ 166.66	Link	6323.95
303430	$ 141	Link	7200
122238	$ 145	Link	7200
591560	$ 150	Link	7200
185916	$ 150	Link	7200
382374	$ 151	Link	7200
544229	$ 161	Link	7200
85659	$ 161	Link	7200
96607	$ 145	Link	7500
547104	$ 145	Link	7517.08
2745	$ 199	Link	10669.71`; // Substitua pelos seus próprios dados de exemplo

// Chama a função de ordenação e geração do arquivo HTML
ordenarPorMelhorPrecoPorMinuto(dadosStr);
