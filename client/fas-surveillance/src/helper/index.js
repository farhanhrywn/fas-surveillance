import moment from "moment";

export const importImg = (img) => {
  const images = {};
  img.keys().map((item) => images[item.replace('./', '')] = img(item));
  return images;
};

export const checkCertDate = (date) => {
  let dateColor
  let fontWeight
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
      fontWeight = null
    } else {
      dateColor = '#dc3545'
      fontWeight = 'bold'
    }
    return (
        <td style={{ color: dateColor, fontWeight: fontWeight, fontSize: '13px' }}>
          {certDate}
        </td>
    )
  }
}

export const getNumRow = (index) => {
  return (
    <td>
      { index + 1 }
    </td>
  )
}

export const isFormValid = (form) => {
  let arrValueForm = Object.values(form)
  let isValueEmpty = arrValueForm.some(val => val === '' || val === undefined)
  if(isValueEmpty) {
    return true
  }
  return false
}