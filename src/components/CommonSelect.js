import React, { useState } from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from '@material-ui/core'
import { PROMISE_STATUS } from 'const/api'

const CommonSelect = ({
  onChange,
  defaultValue,
  label,
  data,
  promiseStatus,
  className,
}) => {
  const [value, setValue] = useState(defaultValue || '')

  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)
    onChange(value)
  }

  return (
    <FormControl variant="outlined" className={className}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} label={label}>
        <MenuItem value="">
          <Box component="em">
            {promiseStatus === PROMISE_STATUS.pending ? 'Đang tải' : 'Bỏ chọn'}
          </Box>
        </MenuItem>
        {!!data?.length &&
          data.map((ele) => (
            <MenuItem key={ele.id} value={ele.id}>
              {ele.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default CommonSelect
