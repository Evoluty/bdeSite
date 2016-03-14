require 'test_helper'

class EquipeControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
