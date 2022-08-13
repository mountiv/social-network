import React from 'react';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },

    onChange(info: any) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }
    },
};

export const InputFile = () => {
    return (<></>
        // <Upload {...props} >
        //     <Button icon={< UploadOutlined/>}>
        //         Add Photo
        //     </Button>
        // </Upload>
    )
}
