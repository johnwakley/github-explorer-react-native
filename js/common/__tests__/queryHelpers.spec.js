import moment from 'moment'
import {dateYesterday, DATE_FORMAT} from '../queryHelpers'

describe('Date helpers', () => {
  it('should be date yesterday', () => {
    let today = moment()
    let expectedDate = today.subtract(1, 'day').format(DATE_FORMAT)
    expect(dateYesterday()).toEqual(expectedDate)
  })
})
