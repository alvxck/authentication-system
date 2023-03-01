import profile from '../assets/profile.jpg';

export const Profile = (props : any) => {

    return (
        <div>
            <img 
                className='w-56 rounded-full' 
                src={profile} 
                alt='profile'/>
            <h3 className='text-white text-center'>{props.name}</h3>
            <input
                className='text-white my-2 p-1 w-56 bg-neutral-800 border rounded border-neutral-700 cursor-pointer' 
                type='submit'
                value='Edit Profile'
            />
            <p className='text-white text-sm'>437 · Followers</p>
            <p className='text-white text-sm'>394 · Following</p>
        </div>
    )
}