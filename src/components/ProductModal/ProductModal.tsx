import { ModalType } from "../../types/ModalType";
import { Product } from "../../types/Product";
import { Button, Form, FormLabel,  Modal } from 'react-bootstrap';

//Dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductService } from "../../services/ProductService";

//Notificacion al usuario
import { toast } from 'react-toastify';


//Recibe parametros como props para que se renderice, su titulo y segun que operacion queremos realizar.
type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    prod: Product;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};



const ProductModal = ({show, onHide, title, modalType, prod, refreshData}: ProductModalProps) => {

    //YUP - Esquema de validacion.
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            title: Yup.string().required('El titulo es requerido'),
            price: Yup.number().min(0).required('El precio es requerido'),
            description: Yup.string().min(0).required('La descripcion es requerida'),
            category: Yup.string().required('La categoria es requerida'),
            image: Yup.string().required('La URL de la imagen es requerida'),
        });
    };

    //Formik, utiliza el esquema de validacion para crea un formulario dinamico 
    //y que lo bloquee en caso de haber errores.
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Product) => handleSaveUpdate(obj),
    });    

    //CREATE - UPDATE
    const handleSaveUpdate = async (pro:Product) => {
    try {
        const isNew = prod.id === 0;
        if(isNew) {
            await ProductService.createProduct(pro);
        } else {
            await ProductService.updateProduct(pro.id,pro);
        }

        toast.success(isNew ? "Producto creado" : "Producto actualizado", {
            position: "top-center",
        });

        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error("Ha ocurrido un error D:");
    }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await ProductService.deleteProduct(prod.id);

            toast.success("Producto eliminado con exito",{
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error D:");
        }
    }





  return (
    <>
        {modalType === ModalType.DELETE ? (
            <> 
            <Modal show={show} onHide={onHide} centeredbackdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Estas seguro que desea eliminar el producto? <br/>

                    <strong> {prod.title} </strong>?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                    <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
                </Modal.Footer>
            </Modal>
            </>
        ) : (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-x1">
                
                    <Modal.Header closeButton>
                        <Modal.Title> { title } </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    
                    <Form onSubmit={formik.handleSubmit}>
                    
                        <Form.Group controlId="formTitulo">
                            <FormLabel> Titulo </FormLabel>
                            <Form.Control
                                name="title"
                                type="text"
                                value={formik.values.title || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.title && 
                                formik.touched.title)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                    

                        <Form.Group controlId="formPrice">
                            <FormLabel> Precio </FormLabel>
                            <Form.Control
                                name="price"
                                type="number"
                                value={formik.values.price || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.price && 
                                formik.touched.price)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                    
                        <Form.Group controlId="formcDescription">
                            <FormLabel> Descripcion </FormLabel>
                            <Form.Control
                                name="description"
                                type="text"
                                value={formik.values.description || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.description && 
                                formik.touched.description)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="formCategory">
                            <FormLabel> Categoria </FormLabel>
                            <Form.Control
                                name="category"
                                type="text"
                                value={formik.values.category || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.category && 
                                formik.touched.category)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="formImage">
                            <FormLabel> Imagen </FormLabel>
                            <Form.Control
                                name="image"
                                type="text"
                                value={formik.values.image || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.image && 
                                formik.touched.image)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                
                
                    <Modal.Footer>

                        <Button variant="secondary" onClick={onHide}> Cancelar </Button>

                        <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>

                    </Modal.Footer>
                    </Form>
                    </Modal.Body>
            </Modal>
            </>
            
        )
        }
    </>
  )
}

export default ProductModal