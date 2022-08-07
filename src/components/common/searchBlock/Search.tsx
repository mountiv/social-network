import Box from "@mui/material/Box/Box"
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";

export const Search = ({onSearch}: { onSearch: (name: string) => void }) => {
    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500)

    useEffect(() => {
        onSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <Box sx={{display: 'flex', alignItems: 'flex-end', marginBottom: 2}}>
            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
            <TextField id="input-with-sx" label="Search user" variant="standard"
                       value={value}
                       onChange={(e) => setValue(e.currentTarget.value)}/>
        </Box>
    )
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebauncedValue] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebauncedValue(value)
        }, delay)

        return () => {
            clearTimeout(id)
        }
    }, [value])

    return debouncedValue
}