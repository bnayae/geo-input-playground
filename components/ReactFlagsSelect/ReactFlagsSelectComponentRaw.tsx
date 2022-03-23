import { useState } from "react";
import ReactFlagsSelect from 'react-flags-select';

interface IWithClass {
  className?: string;
}


export const ReactFlagsSelectComponentRaw = ({ className }: IWithClass) => {
  const [country, setCountry] = useState<string | undefined>('US');

  const handleChanged =  (newValue: string) => {
    setCountry(newValue)
  };


  return (
    <div className={className}>
       <ReactFlagsSelect
        selected={country ?? ''}
        onSelect={() => {}}
      />
    </div>
  );
};
