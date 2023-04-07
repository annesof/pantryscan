import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
} from '@mui/material';

interface SelectProps extends BaseSelectProps {
  options: { id: string | number; name: string }[];
  label: string;
}

export const Select = (props: SelectProps) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel shrink>{props.label}</InputLabel>
      <BaseSelect
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        sx={props.sx}
      >
        {props.options.map((item: { id: string | number; name: string }) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </BaseSelect>
    </FormControl>
  );
};
