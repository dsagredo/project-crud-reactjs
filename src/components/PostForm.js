import React, {useEffect, useState, Fragment} from 'react';
import { srvAdd, srvUpdate } from '../api/ApiService'; 

const PostForm = ({addPost, editingPost}) => {
	const [loading, setLoading] = useState(false);
	const [item, setItem] = useState({});

	useEffect(() => {
		setItem(editingPost);
	  }, [editingPost]);

	const onChangeText = (e) => {
		setItem({
			...item,
			[e.target.name]: e.target.value,
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (item.id) {
			const resp = await srvUpdate(item.id, item);
			addPost(resp.data);
			setItem({});
			setLoading(false);
		  } else {
			const resp = await srvAdd(item);
			addPost(resp.data);
			setItem({});
			setLoading(false);
		}
	}

	return (
		<Fragment>
			{!loading ? (
				<form className="col s12" style={{ marginTop: 10}}>
					<div className="row">
						<div className="input-field">
							<input placeholder="Titulo" name="title" type="text" value={item.title} className="validate" onChange={onChangeText} />
						</div>
						<div className="input-field">
							<input placeholder="Descripción" name="body"  type="text" value={item?.body} className="validate" onChange={onChangeText} />
						</div>
					</div>
					<button className="btn teal lighten-3" type="submit" onClick={(e) => handleSubmit(e)}>{item.id ? 'Actualizar' : 'Agregar'}</button>
				</form>
			) : (
				<div className='progress'>
					<div className='indeterminate'></div>
				</div>
			)}
		</Fragment>
	)
}

export default PostForm;
