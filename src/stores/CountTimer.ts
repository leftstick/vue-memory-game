import { ActionContext } from 'vuex'
import { IStatus, IState } from '@/IType'

class CountTimer {
  private timerId: NodeJS.Timeout | undefined

  tryStartGame(status: IStatus, context: ActionContext<IState, IState>) {
    if (status === IStatus.PLAYING) {
      this.timerId = setInterval(function() {
        context.commit('counting')
      }, 1000)
    }
  }

  tryEndGame(status: IStatus, context: ActionContext<IState, IState>) {
    if (status === IStatus.PASSED) {
      clearInterval(this.timerId!)
      context.commit('updateTopScore')
    }
  }
}

export default new CountTimer()
