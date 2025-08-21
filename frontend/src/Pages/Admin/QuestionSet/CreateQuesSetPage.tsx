import CreateOption from '../../../components/QuestionSet/CreateOption'
import CreateQuesSetForm from '../../../components/QuestionSet/CreateQuesSetForm'

function CreateQuesSetPage() {
    return (
        <div className='h-full w-full overflow-y-auto flex flex-col gap-6'>
            <CreateOption />
            <CreateQuesSetForm />
        </div>
    )
}

export default CreateQuesSetPage