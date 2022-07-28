import moment from 'moment'

export const dateTimeChange = (val) => {
  return moment(val).format('DD.MM.YYYY HH:mm')
}
export const aIFraudTreshold = (val) => {
  console.log('aIFraudTreshold', val)
  if (val >= 80) {
    return 'Yüksek'
  } else if (val >= 20 && val < 80) {
    return 'Orta'
  } else if (val < 20) {
    return 'Düşük'
  }
}
