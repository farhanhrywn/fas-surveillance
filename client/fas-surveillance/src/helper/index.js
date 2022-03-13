import moment from "moment";

export const importImg = (img) => {
  const images = {};
  img.keys().map((item) => images[item.replace('./', '')] = img(item));
  return images;
};

export const checkCertDate = (date) => {
  let dateColor
  let certDate = moment(date).format('DD MMM YYYY')
  if(certDate === 'Invalid date') {
    return (
      <td>
        -
      </td>
    )
  } else {
    let endOfCertDate = moment(certDate).add(1, 'y')

    if(moment().isSameOrBefore(endOfCertDate)) {
      dateColor = null
    } else {
      dateColor = '#dc3545'
    }
    return (
        <td style={{ color: dateColor }}>
          {certDate}
        </td>
    )
  }
}