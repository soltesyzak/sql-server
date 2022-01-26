import moment from "moment"

export const getTimestamp = () => {
    const timestamp: string = moment().format('YYYY-MM-DD HH:mm:ss')
    return timestamp
}