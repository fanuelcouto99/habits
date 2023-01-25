import * as Popover from '@radix-ui/react-popover';

export function HabitDay() {
    return (
        <Popover.Root>
            <Popover.Trigger className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>Segunda-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
                        <div className='h-3 rounded-lg bg-violet-600 w-3/4' />
                    </div>

                    <Popover.Arrow className='fill-zinc-900' height={8} width={16}/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};