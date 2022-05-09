import {TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {red} from "@mui/material/colors";
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: '30px'
    },
    errorText: {
        marginTop: '10px',
        color: red[500]
    }
}));

function CheckedFields(props) {
    const classes = useStyles();
    const {
        fields, register, errors
    } = props

    return (
        <>
           {fields.length && fields.map((f, index) => (
                <div className="field" key={index} className={clsx(classes.field)}>
                    <TextField
                        fullWidth
                        label={f.placeholder}
                        type={f.fieldType}
                        {...register(f.name,
                            { required: f.required, maxLength: 20 }
                        )}
                    />
                      <div className={clsx(classes.errorText)} >
                         {errors[f.name]?.message && f.helperText}
                      </div>
                 </div>
           ))}
        </>
    );
}

export default CheckedFields;
