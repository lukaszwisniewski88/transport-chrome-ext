class UserProfile {
  public firstName: string = null
  public lastName: string = null
  public userId: string = null
  public companyId: string = null
  public email: string = null

  constructor() {
    const parser = new DOMParser()
    fetch('https://my.timocom.com/app/tcprofile/edit/userData.xhtml')
      .then((resp) => resp.text())
      .then((page) => {
        if (typeof page === 'string') {
          this.userParse(parser.parseFromString(page, 'text/html'))
          window.dispatchEvent(new Event('userData'))
        } else new Error('Brak dostępu do profilu!')
      })
  }
  private userParse = (doc: Document) => {
    this.userId = (doc.querySelector(
      '.user-id-label>label'
    ) as HTMLElement).innerText
    this.lastName = (doc.getElementById(
      'frmUserData:inLastName'
    ) as HTMLInputElement).value
    this.firstName = (doc.getElementById(
      'frmUserData:inFirstName'
    ) as HTMLInputElement).value
    this.companyId = (document.querySelector(
      '.customerId'
    ) as HTMLElement).innerText
    this.email = (doc.querySelector(
      '#frmUserData\\:inEmail'
    ) as HTMLInputElement).value
  }
}

export default UserProfile
