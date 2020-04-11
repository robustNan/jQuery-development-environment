export default function displayState(data) {
  const currentData = [
    {
      /* 全球确诊 */
      id: 'global',
      count: data.globalStatistics.confirmedCount,
      add: data.globalStatistics.confirmedIncr,
    },
    {
      /* 国外确诊 */
      id: 'foreign',
      count: data.foreignStatistics.confirmedCount,
      add: data.foreignStatistics.confirmedIncr,
    },
    {
      /* 国内确诊 */
      id: 'demostic',
      count: data.confirmedCount,
      add: data.confirmedIncr,
    },
  ];

  for (const iterator of currentData) {
    $(`#${iterator.id}`)
      .children('h1')
      .html(`${iterator.count} <small class="text-muted">/ 例</small>`)
      .next()
      .children()
      .text(iterator.add > 0 ? `+${iterator.add}` : iterator.add);
  }
}
